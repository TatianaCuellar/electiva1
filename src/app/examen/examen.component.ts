import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {

  step= 1;
  codigo: string;
  responseSelected = [];
  cargando: boolean;
  resultPuntaje = 0;
  isResult = false;
  data: FormGroup;
  preguntas = [
    {
      materia: 'Test covid ',
      descripcion: 'Por favor contestar las siguientes preguntas para determinar si tiene o no covid',
      grupo: [
        {
          title: '¿Ha tenido Fiebre en los últimos 15 días?',
          asset: '',
          respuestas: [
            {
              id: 0,
              title: 'A. Si ',
              status: '',
              puntaje: 1
            },
            {
              id: 1,
              title: 'B. No',
              status: '',
              puntaje: 0
            }
          ]
        },
        {
          title: '¿Ha tenido tos en los últimos 15 días?',
          asset: '',
          respuestas: [
            {
              id: 0,
              title: 'A. Si',
              status: '',
              puntaje: 1
            },
            {
              id: 1,
              title: 'B. No',
              status: '',
              puntaje: 0
            }
          ]
        },
        {
          title: '¿Últimamente se ha sentido muy cansadx?',
          asset: '',
          respuestas: [
            {
              id: 0,
              title: 'A. Si',
              status: '',
              puntaje: 0
            },
            {
              id: 1,
              title: 'B. No',
              status: '',
              puntaje: 1
            }
          ]
        },
        {
          title: '¿Ha tenido perdida del olfato o gusto?',
          respuestas: [
            {
              id: 0,
              title: 'A. Si',
              status: '',
              puntaje: 0
            },
            {
              id: 1,
              title: 'B. No',
              status: '',
              puntaje: 1
            }
          ]
        },
        {
          title: '¿Ha tenido dificultad para respirar?',
          asset: '',
          respuestas: [
            {
              id: 0,
              title: 'A. Si',
              status: '',
              puntaje: 1
            },
            {
              id: 1,
              title: 'B. No',
              status: '',
              puntaje: 0
            }
          ]
        }
      ]
    }
  ];
  buttonSubmit: boolean;

  dataPreguntas;
  test = {
    count: 50,
    data: []
  };

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.validateForm();
  }

  ngOnInit() {
  }

  addQuestions() {
    for (let i = 0; i < this.test.count; i++) {
      this.test.data.push({});
    }
  }

  saveExamen() {
    this.cargando = true;
    this.firebaseService.createExamen(this.data.value).then(resp => {
      this.codigo = resp.id;
    }).finally(() => this.cargando = false);
    this.data.markAllAsTouched();
  }

  saveResponse() {
    this.data.patchValue({
      resultado: this.resultPuntaje
    });
    console.log(this.resultPuntaje);
    this.isResult = this.resultPuntaje >= 5 ? false : true;
  }

  validateForm() {
    this.data = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.email],
      resultado: ['', Validators.required]
    });
  }

  sumaPuntaje(response, question) {
    if (this.responseSelected.find(x => x.pregunta === question)) {
      this.responseSelected.map(respon => {
        respon.respuesta = response;
      });
    } else {
      this.responseSelected.push({
        pregunta: question,
        respuesta: response
      });
    }
    for (let resp of this.responseSelected) {
      this.resultPuntaje = this.resultPuntaje + resp.respuesta.puntaje;
    }
    console.log(this.resultPuntaje);
  }

  changeStep(opt) {
    switch (opt) {
      case 'previous': {
        this.step = this.step - 1;
        break;
      }
      case 'next': {
        this.step = this.step + 1;
        break;
      }
      default: {
        this.step = opt;
        break;
      }
    }
  }

  Copyable(ev) {
    navigator.clipboard.writeText(ev)
      .then(x => alert('Código copeado'))
      .catch(e => alert('error'));
  }
}

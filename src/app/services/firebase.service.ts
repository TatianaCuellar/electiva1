import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  getExamens() {
    return this.firestore.collection('examen').snapshotChanges();
  }

  createExamen(data) {
    return this.firestore.collection('examen').add(data);
  }

  deleteExame(id) {
    return this.firestore.collection('examen').doc(id).delete();
  }

  getExamenForId(email) {
    return this.firestore.collection('examen').doc(email).snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data();
        return data;
      }
    }));
  }
}

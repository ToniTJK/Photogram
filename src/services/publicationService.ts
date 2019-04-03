import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { Observable } from 'rxjs-compat';
//import { map } from 'rxjs-compat/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class PublicationService {

	private snapshotChangesSubscription: any;

	constructor(
        public db: AngularFirestore
        ) {}

    getPublications() {
        return new Promise<any>((resolve, reject) => {
            this.snapshotChangesSubscription = this.db.collection('publications').snapshotChanges() 
                .subscribe(snapshots => {
                    resolve(this.snapshotToArray(snapshots));
                });
        });
    }

    private snapshotToArray(snapshots) {
        let docs = [];
    
        snapshots.forEach(function(doc) {      
            docs.push(doc.payload.doc.data());
            docs[docs.length - 1].id = doc.payload.doc.id;
        });
    
        return docs;
    }
}
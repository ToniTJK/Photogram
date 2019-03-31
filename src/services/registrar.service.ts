import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class GamesService {

	private snapshotChangesSubscription: any;

	constructor(public db: AngularFirestore) {

	}

	create(values) {
		return new Promise<any>((resolve, reject) => {
			this.db.collection('juegos').add(values)
			.then(
				res => resolve(res),
				err => reject(err)
			);
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
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
	
	getOne(id) {
		return new Promise<any>((resolve, reject) => {
			this.snapshotChangesSubscription = this.db.collection('publications').doc(id).snapshotChanges() 
			.subscribe(snapshots => {
				resolve(this.snapshotToArray(snapshots));
			});
		});
	}

    create(values) {
        console.log(values);
		return new Promise<any>((resolve, reject) => {
			this.db.collection('publications').add(values)
			.then(
				res => resolve(res),
				err => reject(err)
			);
		});
	}

	update(id, values) {
		return new Promise<any>((resolve, reject) => {
			this.db.collection('publications').doc(id).update(values)
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

    // IMAGE STUFF
    addImage(id, url) {
		return new Promise<any>((resolve, reject) => {
			this.uploadImage(url)
			.then(imageURL => {
				url = imageURL;   
				this.db.collection('publications').doc(id).update({ image: url })
				.then(
					res => resolve(res),
					err => reject(err)
				);
			});
		});
    }
    
    deleteImage(url) {
		return new Promise<any>((resolve, reject) => {
			let storageRef = firebase.storage().refFromURL(url);
			storageRef.delete()
			.then(
				res => resolve(res),
				err => reject(err)
			);
		});
	}

	unsubscribeOnLogOut(){
		this.snapshotChangesSubscription.unsubscribe();
    }
    
    private encodeImageURI(imageURI, callback) {
		var c = document.createElement('canvas');
		var ctx = c.getContext("2d");
		var img = new Image();
		
		img.onload = function () {
			var aux:any = this;
			c.width = aux.width;
			c.height = aux.height;
			ctx.drawImage(img, 0, 0);
			var dataURL = c.toDataURL("image/jpeg");
			callback(dataURL);
		};
		
		img.src = imageURI;
	}

	private uploadImage(imageURI) {
		return new Promise<any>((resolve, reject) => {
			let randomId = Math.random().toString(36).substr(2, 5);
			let storageRef = firebase.storage().ref().child('images').child('publications').child(randomId);
			
			this.encodeImageURI(imageURI, function(image64){
				storageRef.putString(image64, 'data_url')
				.then(snapshot => {
					snapshot.ref.getDownloadURL()
					.then(res => resolve(res))
				}, err => {
					reject(err);
				});
			});
		});
	}
    
}
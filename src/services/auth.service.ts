/*import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthService {

	private _userId: string;

	constructor(private angularFireAuth: AngularFireAuth,
				public db: AngularFirestore) {
		this.angularFireAuth.authState.subscribe((user) => {
			if (user) {
				this._userId = user.uid;
			} else {
				this._userId = null;
			}
		})
	}

	get userId():string {
		return this._userId;
	}

	doSingUp(values) {
		return new Promise<any>((resolve, reject) => {
			this.angularFireAuth.auth.createUserWithEmailAndPassword(values.email, values.password)
			.then(res => {
				this._userId = this.angularFireAuth.auth.currentUser.uid;
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	}

	doLogin(values) {
		return new Promise<any>((resolve, reject) => {
			this.angularFireAuth.auth.signInWithEmailAndPassword(values.email, values.password)
			.then(res => {
				this._userId = this.angularFireAuth.auth.currentUser.uid;
				resolve(res);
			}).catch((err) => {
				reject(err);
			});
		})
	}

	doLogout() {
		return new Promise((resolve, reject) => {
			if(this.angularFireAuth.auth.currentUser){
				this.angularFireAuth.auth.signOut()
				.then(() => {
					resolve();
				}).catch((err) => {
					reject(err);
				});
			}
		})
	}
	
}
*/
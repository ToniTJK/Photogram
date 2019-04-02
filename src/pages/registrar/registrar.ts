import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { User } from '../../model/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
  providers: [ AuthService ]
})
export class RegistrarPage {

  private user: User;
  private password2:string;
  private error: boolean = false;
	private errorMsg: string;

  constructor(
    public navCtrl: NavController,
    public _AuthService: AuthService
    ) {
      this.user = new User("","","");
  }
  onSubmit(){
    console.log(this.user);
    if (this.user.email.length > 0 && this.user.password.length > 0 && this.user.nombre.length > 0) {
      if(this.user.password === this.password2){
        if(this.user.password.length >= 6){
          this._AuthService.doSingUp(this.user)
          .then(res => {
            this.navCtrl.push(LogInPage);
          }, err => {
            this.errorMsg = 'Error al enviar les dades';
            this.error = true;
          });
        } else {
          this.errorMsg = 'La password té que tenir almeny 6 caracters!';
          this.error = true;
        }
      } else {
        this.errorMsg = 'Tots els camps són obligatoris';
        this.error = true;
      }
    } else {
      this.errorMsg = 'Tots els camps són obligatoris';
			this.error = true;
    } 
  }
  goToLogIn(params){
    if (!params) params = {};
    this.navCtrl.push(LogInPage);
  }
}

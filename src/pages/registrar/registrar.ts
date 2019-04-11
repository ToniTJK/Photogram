import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
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
  private error: boolean;
  private errorMsg: string;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public _AuthService: AuthService,
    private loadingCtrl: LoadingController
    ) {
      this.user = new User("","","");
      this.error = false;
      this.errorMsg = "";
  }
  onSubmit(){
    console.log(this.user);
    if (this.user.email.length > 0 && this.user.password.length > 0 && this.user.nombre.length > 0) {
      if(this.user.password === this.password2){
        if(this.user.password.length >= 6){
          this.loading = this.loadingCtrl.create({
            content: '',
            spinner: 'dots',
            cssClass: 'spinner'
          });
          this.loading.present();
          this._AuthService.doSingUp(this.user).then(res => {
            this.navCtrl.push(LogInPage);
            this.loading.dismiss();
          }, err => {
            this.errorMsg = 'Error al enviar les dades';
            this.error = true;
            this.loading.dismiss();
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

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  constructor(
    public navCtrl: NavController,
    public _AuthService: AuthService
    ) {
      //this.user('','','');
  }

  onSubmit(){
    //this._AuthService.doLogin(this.user);
  }

  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
  goToRegistrar(params){
    if (!params) params = {};
    this.navCtrl.push(RegistrarPage);
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrarPage } from '../registrar/registrar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';


@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
  providers: [ AuthService ]
})
export class LogInPage {

  public user: User;
  public password2: string;
  public error: boolean;
  public errorMsg: string;

  constructor(
    public navCtrl: NavController,
    public _AuthService: AuthService,
    ) {
      this.user = new User('','','');
      this.error = false;
      this.errorMsg = "";
      this.password2 = "";
  }

  ngOnInit(){
    this.navCtrl.push(HomePage);
  }

  onSubmit(){
    if (this.user.email.length > 0 && this.user.password.length > 0 && this.password2.length > 0) {
			if (this.user.password === this.password2) {
        console.log(this.user);
				this._AuthService.doLogin(this.user)
				.then(res => {
          this.navCtrl.setRoot(HomePage);
				}, err => {
					this.errorMsg = 'Error: Usuari trobat.';
					this.error = true;
				})
			} else {        
				this.errorMsg = 'Les contrasenyes no coincideixen';
				this.error = true;
			}
		} else {
			this.errorMsg = 'Tots els camps són obligatoris';
			this.error = true;
		}
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

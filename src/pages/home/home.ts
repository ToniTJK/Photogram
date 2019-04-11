import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { PublicationService } from '../../services/publicationService';
import { CrearPostPage } from '../crear-post/crear-post'
import { LogInPage } from '../log-in/log-in'
import { AuthService } from '../../services/auth.service';
import { Publication } from '../../model/publi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ PublicationService, AuthService ]
})
export class HomePage {

  private publications:Array<any>;
  private currentPublication:Publication;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public _publicationService: PublicationService,
    public _authService: AuthService,
    private loadingCtrl: LoadingController,
    ) {
      this.currentPublication = new Publication("","","","","");
  }

  /*ngOnInit(){
    this.loadData();
  }*/

  ionViewWillEnter(){
    this.loadData();
    this.resetPubli();
	}

  loadData(){
    this.loading = this.loadingCtrl.create({
			content: '',
			spinner: 'dots',
			cssClass: 'spinner'
    });
    this.loading.present();
    this._publicationService.getPublications()
    .then(publications => {
      this.publications = publications;
      this.loading.dismiss();
		});
  }

  resetPubli(){
    this.currentPublication.title = "";
    this.currentPublication.description = "";
    this.currentPublication.image = "";
    this.currentPublication.user = "";
  }

  logOut(){
    this.loading = this.loadingCtrl.create({
			content: '',
			spinner: 'dots',
			cssClass: 'spinner'
    });
    this.loading.present();
    this._authService.doLogout()
    .then(res => {
			this.goToLogIn();
			this.loading.dismiss();
		});
  }

  goToLogIn(){
    this.navCtrl.push(LogInPage);
  }
  
  goToCreatorPost(){
    this.navCtrl.push(CrearPostPage);
  }

  goToEditPost(publication){
    this.navCtrl.push(CrearPostPage, { publication: publication });
  }
  
}

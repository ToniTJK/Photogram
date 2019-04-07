import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { PublicationService } from '../../services/publicationService';
import { CrearPostPage } from '../crear-post/crear-post'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ PublicationService, AuthService ]
})
export class HomePage {

  private publications:Array<any>;
  private imageSource:any;
  private publicationImage:any;

  constructor(
    public navCtrl: NavController,
    public _publicationService: PublicationService,
    public _authService: AuthService
    ) {
  }

  /*ngOnInit(){
    this.loadData();
  }*/

  ionViewWillEnter(){
    this.loadData();

	}

  loadData(){
    this._publicationService.getPublications()
    .then(publications => {
			this.publications = publications;
		});
  }

  logOut(){
    this._authService.doLogout();
  }
  
  goToCreatorPost(){
    this.navCtrl.push(CrearPostPage);
  }
  
}

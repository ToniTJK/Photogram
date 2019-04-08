import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { PublicationService } from '../../services/publicationService';
import { CrearPostPage } from '../crear-post/crear-post'
import { AuthService } from '../../services/auth.service';
import { Publication } from '../../model/publi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ PublicationService, AuthService ]
})
export class HomePage {

  private publications:Array<any>;
  private imageSource:any;
  private publicationImage:any;
  private currentPublication:Publication;

  constructor(
    public navCtrl: NavController,
    public _publicationService: PublicationService,
    public _authService: AuthService
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
    this._publicationService.getPublications()
    .then(publications => {
			this.publications = publications;
		});
  }

  resetPubli(){
    this.currentPublication.title = "";
    this.currentPublication.description = "";
    this.currentPublication.image = "";
    this.currentPublication.user = "";
  }

  logOut(){
    this._authService.doLogout();
  }
  
  goToCreatorPost(){
    this.navCtrl.push(CrearPostPage);
  }

  goToEditPost(publication){
    this.navCtrl.push(CrearPostPage, { publication: publication });
  }
  
}

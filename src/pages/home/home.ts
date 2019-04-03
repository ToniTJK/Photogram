import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { PublicationService } from '../../services/publicationService';
import { CrearPostPage } from '../crear-post/crear-post'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ PublicationService ]
})
export class HomePage {

  private publications:Array<any>;

  constructor(
    public navCtrl: NavController,
    public _publicationService: PublicationService
    ) {
  }

  /*ngOnInit(){
    this.loadData();
  }*/

  ionViewWillEnter(){
		this.loadItems();
	}

  loadData(){
    this._publicationService.getPublications()
    .then(publications => {
			this.publications = publications;
		});
  }

  loadItems() {
		this._publicationService.getPublications()
		.then(publications => {
			this.publications = publications;
		})
  }
  
  goToCreatorPost(){
    this.navCtrl.push(CrearPostPage);
  }
  
}

import { Component } from '@angular/core';

// UTILITY
import { NavController, AlertController, ToastController, LoadingController,
         ViewController, NavParams, normalizeURL, } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { HomePage } from '../home/home'; // PAGES 
import { Publication } from '../../model/publi'; //MODEL
// CAMERA
import { Camera, CameraOptions } from '@ionic-native/camera';
// SERVICES
import { AuthService } from '../../services/auth.service';
import { PublicationService } from '../../services/publicationService';

@Component({
  selector: 'page-crear-post',
  templateUrl: 'crear-post.html',
  providers: [
		AuthService,
    PublicationService,
	  ]
})

export class CrearPostPage{

	private publi:Publication;
	private loading: any;
	private currentPubliId: any;
	private isOwner: boolean;
	private isNew: boolean;
	private isEditarBtn:boolean;

  constructor (
    public navCtrl: NavController,
    public _publiService: PublicationService,
    public _authService: AuthService,
    private viewCtrl: ViewController,
		private navParams: NavParams,
		private loadingCtrl: LoadingController,
		private imagePicker: ImagePicker,
		private camera: Camera
    ) {
	  this.publi = new Publication("","","","","");
	  this.isOwner = false;
	  this.isNew = false;
	  this.isEditarBtn = false;
		}
		
	ionViewWillLoad(){
		console.log(this._authService.userId);
		//var x = document.getElementById("crearPost-button12");
		if(this.navParams.get('publication') != null) {
			this.publi = this.navParams.get('publication');
			//x.innerHTML = "EDITAR";
			this.isEditarBtn = true;
			if(this.publi.user == this._authService.userId){
				this.isOwner = true;
			}
		} else {
			this.isNew = true;
			//x.innerHTML = "CREAR"
		}
	}

	isEdit(){
		if(this._authService.userId != null){
			if(this.publi.user !== ""){
				this.editPublication();
			} else {
				this.createPublication();
			}
		} else {
			alert("Tienes que iniciar sesión si quieres hacer eso!");
		}
		
	}

  createPublication(){
		this.publi.user = this._authService.userId;
	
		this.loading = this.loadingCtrl.create({
			content: '',
			spinner: 'dots',
			cssClass: 'spinner'
		});
		this.loading.present();
		const param = JSON.parse(JSON.stringify(this.publi));
		this._publiService.create(param)
		.then(res => {
			this.resetPubli();
			this.goToHome();
			this.loading.dismiss();
		});
	}
	
	editPublication(){
		this.loading = this.loadingCtrl.create({
			content: '',
			spinner: 'dots',
			cssClass: 'spinner'
		});
		this.loading.present();
		const param = JSON.parse(JSON.stringify(this.publi));
		this._publiService.update(this.publi.id, param) // EDITAR
		.then(res => {
			this.resetPubli();
			this.goToHome();
			this.loading.dismiss();
		});
	}

	resetPubli() {
		this.currentPubliId = '';
		this.publi.description = '';
		this.publi.image = '';
		this.publi.title = '';
		this.publi.user = '';
	}

  // IMAGE STUFF
	
	saveImage() {
		this.loading = this.loadingCtrl.create({ content: '',
												spinner: 'dots',
												cssClass: 'spinner',
												dismissOnPageChange: true
											});
		this.loading.present();
		this._publiService.addImage(this.publi.id, this.publi.image)
		//this.itemsService.addImage(this.item.id, this.item.image)
		.then(res => {
			this.loading.dismiss();
			this.viewCtrl.dismiss();
		})
	}
	
/*
	deleteImage() {
		this.loading = this.loadingCtrl.create({ content: '',
												spinner: 'dots',
												cssClass: 'spinner',
												dismissOnPageChange: true
											});
		this.loading.present();
		this.itemsService.deleteImage(this.item.image)
		.then(res => {
			this.itemsService.update(this.item.id, { image: null })
			.then(res => {
				this.loading.dismiss();
				this.viewCtrl.dismiss();
			}, (err) => console.log(err));
		}, (err) => console.log(err));
	}
	*/

	imageFromCamera() {
		let opciones: CameraOptions = {
			quality: 100,
			//destinationType: this.camera.DestinationType.FILE_URI,
			//encodingType: this.camera.EncodingType.JPEG,
			//mediaType: this.camera.MediaType.PICTURE
			destinationType: this.camera.DestinationType.DATA_URL,
			saveToPhotoAlbum:false,
			targetWidth: 500,
			targetHeight: 500
		}
		
		this.camera.getPicture(opciones)
		.then(imagen => {
			this.publi.image = 'data:image/jpeg;base64,' + imagen;
		})
		.catch(error =>{
			console.error( error );
		});
	}
	

	imageFromGallery(){
		let opciones: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			saveToPhotoAlbum:false,
			targetWidth: 500,
			targetHeight: 500
		}
		
		this.camera.getPicture(opciones)
		.then(imagen => {
			this.publi.image = 'data:image/jpeg;base64,' + imagen;
		})
		.catch(error =>{
			console.error( error );
		});
		
	}

  // REDIRECTS

  goToHome(){
    this.navCtrl.push(HomePage);
  }
}

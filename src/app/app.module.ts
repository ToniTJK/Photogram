import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// PAGES
import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in';
import { RegistrarPage } from '../pages/registrar/registrar';
import { EditarPostPage } from '../pages/editar-post/editar-post';
import { CrearPostPage } from '../pages/crear-post/crear-post';

// FIREBASE
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environment/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

//SERVICES
import { AuthService } from '../services/auth.service';
import { PublicationService } from '../services/publicationService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LogInPage,
    RegistrarPage,
    EditarPostPage,
    CrearPostPage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LogInPage,
    RegistrarPage,
    EditarPostPage,
    CrearPostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AngularFireAuth,
    PublicationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
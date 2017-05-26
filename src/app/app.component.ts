import { AuthenticationService } from './../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any = "Entry";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthenticationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();



    });
    if (this.auth.isAuthenticated()) {
      this.rootPage = 'Tabs'
    }
  }
}

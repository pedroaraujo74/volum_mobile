import { Storage } from '@ionic/storage';
import { AuthenticationService } from './../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, public storage: Storage, splashScreen: SplashScreen, private auth: AuthenticationService) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#ffffff');
      statusBar.overlaysWebView(true);
      splashScreen.hide();
    });

    this.storage.get('USER_ID').then(res => {
      console.log("res", res);
      if (res) {

        this.rootPage = 'Tabs'

      } else {
        this.rootPage = 'Entry'
      }
    })

  }
}

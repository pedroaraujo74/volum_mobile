import { AuthenticationService } from './../../shared/auth/authentication.service';
import { EntryService } from './entry.service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
  providers: [Facebook, EntryService]
})
export class Entry {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationService, public entryService: EntryService, private fb: Facebook, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Entry');
  }

  goLogin() {
    this.navCtrl.push("Login");
  }

  goRegister() {
    this.navCtrl.push("Register0");
  }

  facebookLogin() {
    let profile: any;

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.http.get(`https://graph.facebook.com/me?fields=birthday,picture,gender,email,name&access_token=${res.authResponse.accessToken}&type=large&redirect=false`).toPromise().then(user => {
          console.log("USER", user.json());
          profile = user.json();

          if (profile.gender == 'Male') {
            profile.gender = 0;
          } else {
            profile.gender = 1;
          }
          this.entryService.registerSocialUser(profile.email, new Date(profile.birthday), profile.name, profile.gender, 1, profile.picture.data.url).then((res: any) => {

            this.auth.storeUserCredentials(res.id_token, res.id_user)
            this.auth.reloadUser(res.id_user, true);
            this.navCtrl.push("Tabs");
          })
            .catch(err => {
              console.log("ERRO")
            });

        })
      })
      .catch(e => console.log('Error logging into Facebook', e));

  }
}

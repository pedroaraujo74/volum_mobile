import { AuthenticationService } from './../../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class Profile {
    public popover = null;
    public tabsProfile;
    public user = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public auth: AuthenticationService) {
        this.tabsProfile = "actions";
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Profile');
        this.auth.userPromise.then(res => {
            this.user = res.user;
            console.log(this.user);
        });
    }

    //POPOVER HEADER
    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '1', userId: '1' });
        popover.present({
            ev: ev
        });
    }

}

import { VolsService } from './../../shared/vols.service';
import { UsersService } from './../../services/users.service';
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
    providers: [UsersService, VolsService]
})
export class Profile {
    public popover = null;
    public tabsProfile;
    public user: any = {};

    public my_applies = [];
    public my_vols = [];
    public all_vols = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public volsService: VolsService, public userService: UsersService, public popoverCtrl: PopoverController, public auth: AuthenticationService) {
        this.tabsProfile = "actions";
        this.auth.userPromise.then(res => {
            console.log("PARAMS", this.navParams.get('id_user'))
            console.log("RESSS", res);
            if (!this.navParams.get('id_user')) {

                this.user = res.user;
                console.log(this.user);

            } else {
                this.userService.getProfile(this.navParams.data.id_user).then(result => {
                    console.log(result);


                    this.user = result.user;

                    if (this.user['type'] == 1) {
                        this.volsService.getMyVols(this.user.id_user).then(res => {
                            this.my_vols = res.vols;
                            console.log(this.my_vols)

                        }).catch(err => console.log(err));
                    } else {
                        this.volsService.getVolHistory(this.user.id_user)
                            .then(res => {
                                this.all_vols = res.vols;
                                console.log("history", this.all_vols)
                            })
                            .catch(err => console.log(err));
                    }
                }).catch(error => {
                    console.error(error);
                })
            }
        });

    }



    ionViewDidLoad() {
        console.log('ionViewDidLoad Profile');

    }
    getDay(date: Date) {
        console.log("123", date.getDay());
        return date.getDay();
    }

    //POPOVER HEADER
    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '1', userId: '1' });
        popover.present({
            ev: ev
        });
    }

}

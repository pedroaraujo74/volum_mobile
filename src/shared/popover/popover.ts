import { AuthenticationService } from './../auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController, App, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html',
})
export class Popover {

    public typePopOver: any;

    public creatorId: any;
    public volId: any;
    public popOver: any;

    public typeSettings: number;
    public loggedUserId: any = {};
    public cardUser: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App, public modalController: ModalController, public auth: AuthenticationService) {

        this.volId = navParams.get('volId');
        this.creatorId = navParams.get('creatorId');
        this.popOver = navParams.get('popOver');



        this.typePopOver = navParams.get('typePopOver');

        this.typeSettings = navParams.get('typeSettings');


        // CARD 
        if (this.auth.isAuthenticated()) {


            this.auth.userPromise.then(res => {
                console.log("res", res);
                if (res.success) {
                    console.log(res);
                    this.loggedUserId = res.user.id_user;
                    if (this.creatorId == this.loggedUserId) {
                        this.cardUser = 0;
                    }
                    else {
                        this.cardUser = 1
                    }

                }
            });

        }
    }

    logout() {
        this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().push("Entry");
            this.auth.logout();
        })
    }



    settings() {
        this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().push("Settings");
        });
    }

    profile() {
        this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().push("Profile");
        });
        /*
        this.viewCtrl.dismiss().then(() => {
            this.app.getRootNav().push("Tabs", {tabIndex: 4});
        });
        */
    }

    openModal() {
        this.viewCtrl.dismiss().then(() => {
            const modal = this.modalController.create("ModalSettings", { typeSettings: this.typeSettings });
            modal.present();
        });
    }

}

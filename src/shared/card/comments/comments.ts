import { VolsService } from './../../../services/vols.service';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-comments',
    templateUrl: 'comments.html',
})
export class Comments {

    public user: any;
    public comments: any;
    constructor(public navCtrl: NavController, public modalController: ModalController, public volsService: VolsService, public auth: AuthenticationService, public navParams: NavParams, public popoverCtrl: PopoverController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Comments');
        this.auth.userPromise.then(res => {
            this.user = res.user;
            console.log("USER1", this.user)
        })

        this.getComments();
    }


    openModalNewDiscussion() {
        let modal = this.modalController.create("ModalDiscussion", { user: this.user, volId: this.navParams.get('volId') });
        modal.present();

        modal.onDidDismiss(data => {
            this.getComments();
        });
    }

    //POPOVER HEADER
    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
        popover.present({
            ev: ev
        });
    }

    getComments() {
        this.volsService.getComments(this.navParams.get('volId'))
            .then(res => {
                this.comments = res.comments;
                console.log(res.comments)
            })
            .catch(err => console.log(err));
    }

    openMenusCard(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '3', userId: '1' });
        popover.present({
            ev: ev
        });
    }

}

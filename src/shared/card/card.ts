import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

import { VolsService } from './../../services/vols.service';
import { AuthenticationService } from './../auth/authentication.service';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, PopoverController, ToastController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'volum-card',
    templateUrl: 'card.html',
    providers: [VolsService, Clipboard, SocialSharing]
})
export class Card {

    public teste;
    @Input() type;
    @Input() userCreator;
    @Input() dateCreation;
    @Input() name;
    @Input() description;
    @Input() avatar;
    @Input() username;
    @Input() verified;
    @Input() map;
    @Input() likes;
    @Input() id_vol;
    @Input() photos;
    @Input() likeState;

    //DETAILS
    public details: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public toastCtrl: ToastController, public actionsheetCtrl: ActionSheetController,
        public platform: Platform, public clipboard: Clipboard, public socialSharing: SocialSharing,
        public popoverCtrl: PopoverController, public auth: AuthenticationService, public volsService: VolsService) {
        moment.locale('pt-pt');

    }

    goDetails(id, name) {
        this.navCtrl.push("CardDetails", { volId: id, volName: name });
    }

    like(id_vol) {
        this.likeState = 1;
        this.likes++;
        this.volsService.like(id_vol).then(res => { });
    }

    dislike(id_vol) {
        this.likeState = 0;
        this.likes--;
        this.volsService.dislike(id_vol).then(res => { });
    }


    openMenus(ev, creatorId, volId) {
        let popover = this.popoverCtrl.create("Popover", { creatorId: creatorId, volId: volId, popOver: 0 });
        console.log("POP", volId);
        popover.present({
            ev: ev
        });
    }

    // GO PROFILE
    goProfile(id_user) {
        this.navCtrl.push("Profile", { id_user: id_user });
    }

    openComments(value) {
        this.navCtrl.push("Comments", { volId: value });
    }
    share() {


        console.log("photo 1", this.photos[0])

        let photo = this.photos[0] + '.jpeg';
        console.log("photo 2", photo);

        this.socialSharing.share(this.name, this.name, this.photos[0], `http://bevolun.com/action/${this.id_vol}`);

    }
    openShare() {
        let actionSheet = this.actionsheetCtrl.create({
            title: 'Partilhar',
            cssClass: 'action-sheets-share',
            buttons: [
                {
                    text: 'Copiar link',
                    icon: !this.platform.is('ios') ? 'share-alt' : null,
                    cssClass: 'textColor',
                    handler: () => {

                        console.log("photo 1", this.photos[0])

                        let photo = this.photos[0] + '.jpeg';
                        console.log("photo 2", photo);
                        this.socialSharing.share(this.name, this.name, this.photos[0], `http://bevolun.com/action/${this.id_vol}`);


                    }
                },
                {
                    text: 'Facebook',
                    icon: !this.platform.is('ios') ? 'logo-facebook' : null,
                    cssClass: 'textColor',
                    handler: () => {
                        console.log('Share clicked');

                        this.socialSharing.shareViaFacebookWithPasteMessageHint(this.name, this.photos[0], `http://bevolun.com/action/${this.id_vol}`, this.name).then(res => {
                            console.log(res);
                        }).catch(err => console.log(err))
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: !this.platform.is('ios') ? 'close' : null,
                    cssClass: 'textColor',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }




}

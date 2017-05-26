import { AuthenticationService } from './../auth/authentication.service';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, PopoverController} from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'volum-card',
    templateUrl: 'card.html',
})
export class Card {

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
    @Input() idVol;
    @Input() photos;


    //LIKE
    public liked : boolean = false

    //DETAILS
    public details

    constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public platform: Platform, public popoverCtrl: PopoverController, public auth: AuthenticationService) {
        moment.locale('pt-pt');
    }

    goDetails(id, name){
        this.navCtrl.push("CardDetails", { volId: id, volName: name });
    }   

    like(){
        if(this.liked == false){
            this.liked = true;
        }
        else{
            this.liked = false;
        }    
    }

    openMenus(ev, creatorId, volId){
        let popover = this.popoverCtrl.create("Popover", {creatorId: creatorId, volId: volId, popOver: 0});
        popover.present({
            ev: ev
        });
    }

    openComments(value){
        this.navCtrl.push("Comments", {postId:value});
    }

  openShare(){
        let actionSheet = this.actionsheetCtrl.create({
        title: 'Partilhar',
        cssClass: 'action-sheets-share',
        buttons: [
            {
            text: 'Copiar link',
            icon: !this.platform.is('ios') ? 'share-alt' : null,
            cssClass: 'textColor',
            handler: () => {
                console.log('Share clicked');
            }
            },
            {
            text: 'Facebook',
            icon: !this.platform.is('ios') ? 'logo-facebook' : null,
            cssClass: 'textColor',
            handler: () => {
                console.log('Share clicked');
            }
            },
            {
            text: 'Google Plus',
            icon: !this.platform.is('ios') ? 'logo-googleplus' : null,
            cssClass: 'textColor',
            handler: () => {
                console.log('Play clicked');
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

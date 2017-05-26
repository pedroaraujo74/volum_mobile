import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

/**
 * Generated class for the Chat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
  }

    goMessage(value){
        let conversationId = value;
        this.navCtrl.push("ChatMessage", {conversationId: conversationId});
    }

    newMessage(){
         this.navCtrl.push("NewMessage");
    }

    openSettings(){
        let actionSheet = this.actionSheetCtrl.create({
        cssClass: 'action-sheets-chat',
        buttons: [
          {
            text: 'Eliminar',
            role: 'destructive',
            cssClass: 'textColor',
             icon: !this.platform.is('ios') ? 'trash' : null,
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'textColor',
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
      }

}

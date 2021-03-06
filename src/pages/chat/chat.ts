import { AuthenticationService } from './../../shared/auth/authentication.service';
import { UsersService } from './../../services/users.service';
import { ChatService } from './../../services/chat.service';
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
  providers: [ChatService, UsersService]
})
export class Chat {

  public conversations = [];
  public ready: boolean = false;
  constructor(public navCtrl: NavController, public auth: AuthenticationService, public navParams: NavParams, public userService: UsersService, public actionSheetCtrl: ActionSheetController, public chatService: ChatService, public platform: Platform) {
  }

  ionViewWillEnter() {

    console.log("loaded chat")
    console.log(this.auth.isAuthenticated())
    if (this.auth.isAuthenticated()) {
      this.chatService.getConversations().then(res => {

        console.log("res", res);
        this.conversations = res.conversations;
        this.getUsersAndLastMessage();
        this.ready = true;

      });

    }
  }

  getUsersAndLastMessage() {
    for (let i = 0; i < this.conversations.length; i++) {

      this.userService.getProfile(this.conversations[i].id_user).then(res => {
        this.conversations[i].photo_url = res.user.photo;
        this.conversations[i].name = res.user.name;
        console.log(res);
      });


      this.chatService.getLastMessage(this.conversations[i].id_conversation).then(res => {

        console.log("last message", res);
        console.log("conversations", this.conversations)
        if (res.messages.length > 0) {
          this.conversations[i].message = res.messages[0].message;
          this.conversations[i].date = res.messages[0].date;

        } else {
        }
        console.log("end conversation", this.conversations)
      });

    }
  }

  goMessage(id_conversation, name, photo) {
    this.navCtrl.push("ChatMessage", { id_conversation: id_conversation, name: name, photo: photo });
  }

  newMessage() {
    this.navCtrl.push("NewMessage");
  }

  openSettings(id_conversation) {
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
        }, {
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

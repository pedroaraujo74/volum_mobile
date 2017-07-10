import { SocketService } from './../../../services/socket.service';
import { AuthenticationService } from './../../../shared/auth/authentication.service';
import { ChatService } from './../../../services/chat.service';
import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-chat-message',
  templateUrl: 'chat-message.html',

  providers: [Keyboard, ChatService, SocketService]
})
export class ChatMessage {
  @ViewChild(Content) content: Content;

  // @ViewChild(Content) content: Content;

  public inputElement;
  public millis = 200;
  public scrollTimeout = this.millis + 50;
  public textareaHeight;
  public scrollContentElelment: any;
  public footerElement: any;
  public initialTextAreaHeight;
  public id_user: number;
  public keyboardHideSub;
  public keybaordShowSub;
  public message = "";
  public scrollDownOnLoad;

  public name: string;
  public photo: string;
  public id_conversation: number;

  public messages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationService, public keyboard: Keyboard, public socket: SocketService, public renderer: Renderer, public platform: Platform, public chatService: ChatService) {
    moment.locale('pt-pt')
    this.scrollDownOnLoad = true;
    console.log(this.navParams.data);
    this.name = this.navParams.data.name;
    this.photo = this.navParams.data.photo;
    this.id_conversation = this.navParams.data.id_conversation;

  }

  ionViewDidLoad() {

    this.auth.userPromise.then(res => {


      this.id_user = res.user.id_user;

      this.socket.joinRoom(this.id_conversation);
      if (this.auth.isAuthenticated()) {


        this.chatService.getMessages(this.id_conversation).then(res => {
          console.log("RES", res)
          this.messages = res.messages;
          console.log(this.messages);
          for (let i = 0; i < this.messages.length; i++) {
            this.messages[i].toggle = false;
          }
        })

        this.socket.onMessage().subscribe((res: any) => {
          console.log("rees", res);
          if (res.from_id == this.id_user) {


          } else {



            this.messages.push({
              from_id: res.from_id,
              message: res.message
            })

            setTimeout(() => {
              this.content.scrollToBottom();
            });
          }

        });

      }

    }
    )




  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }



  sendMessage(message) {
    if (typeof message == 'string' && message.length > 0 && message && message.replace(/^\s+/g, '').length) {

      this.chatService.sendMessage(this.id_conversation, message).then(res => {
        this.message = '';
        this.messages.push({
          from_id: this.id_user,
          message: message
        })
        this.content.scrollToBottom();

      });

    }

  }






}

import { SocketService } from './../../../services/socket.service';
import { AuthenticationService } from './../../../shared/auth/authentication.service';
import { ChatService } from './../../../services/chat.service';
import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';


@IonicPage()
@Component({
  selector: 'page-chat-message',
  templateUrl: 'chat-message.html',
  providers: [Keyboard, ChatService, SocketService]
})
export class ChatMessage {

  @ViewChild(Content) content: Content;

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


      this.chatService.getMessages(this.id_conversation).then(res => {

        this.messages = res.messages;
        console.log(this.messages);
      })

      this.socket.onMessage().subscribe((res: any) => {
        console.log("rees", res);
        if (res.from_id == this.id_user) {


        } else {
          this.messages.push({
            from_id: res.from_id,
            message: res.message
          })
        }

      });

    }
    )



  }



  sendMessage(message) {
    if (typeof message == 'string' && message.length > 0 && message && message.replace(/^\s+/g, '').length) {

      this.chatService.sendMessage(this.id_conversation, message).then(res => {
        this.message = '';
        this.messages.push({
          from_id: this.id_user,
          message: message
        })
      });

    }

  }





  /*
ionViewDidLoad() {
  if (this.platform.is('ios')) {
    this.addKeyboardListeners()
  }

  this.scrollContentElelment = this.content.getScrollElement();

  this.footerElement = document.getElementsByTagName('page-chat-message')[0].getElementsByTagName('ion-footer')[0];
  this.inputElement = document.getElementsByTagName('page-chat-message')[0].getElementsByTagName('textarea')[0];

  this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
    this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

  this.scrollContentElelment.style.cssText = this.scrollContentElelment.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
    this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

  this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
  this.initialTextAreaHeight = this.textareaHeight;

  this.updateScroll('load', 500)

}

  footerTouchStart(event) {
    //console.log('footerTouchStart: ', event.type, event.target.localName, '...')
    if (event.target.localName !== "textarea") {
      event.preventDefault();
      // console.log('preventing')
    }
  }

  textAreaChange() {
      let newHeight = Number(this.inputElement.style.height.replace('px', ''));
      if (newHeight !== this.textareaHeight) {

        let diffHeight = newHeight - this.textareaHeight;
        this.textareaHeight = newHeight;
        let newNumber = Number(this.scrollContentElelment.style.marginBottom.replace('px', '')) + diffHeight;

        let marginBottom = newNumber + 'px';
        this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
        this.updateScroll('textAreaChange', this.scrollTimeout);
      }
  }

  removeKeyboardListeners() {
      this.keyboardHideSub.unsubscribe();
      this.keybaordShowSub.unsubscribe();
  }

  addKeyboardListeners() {

  this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
    let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
    let marginBottom = newHeight + 'px';
    console.log('marginBottom', marginBottom)
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
    this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
  });

  this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

    let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
    let marginBottom = newHeight + 44 + 'px';
    console.log('marginBottom', marginBottom)
    this.renderer.setElementStyle(this.scrollContentElelment, 'marginBottom', marginBottom);
    this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
    this.updateScroll('keybaord show', this.scrollTimeout);
  });
}

contentMouseDown(event) {
  //console.log('blurring input element :- > event type:', event.type);
  this.inputElement.blur();
}

touchSendButton(event: Event) {
  //console.log('touchSendButton, event type:', event.type);
  event.preventDefault();
  this.sendMessage();
}

updateScroll(from, timeout) {
  setTimeout(() => {
    //console.log('updating scroll -->', from)
    this.content.scrollToBottom();
  }, timeout);
}
sendMessage() {

  

}

*/
}

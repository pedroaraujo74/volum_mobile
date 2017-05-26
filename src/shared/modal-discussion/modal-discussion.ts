import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-discussion',
  templateUrl: 'modal-discussion.html',
})
export class ModalDiscussion {

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-choose',
  templateUrl: 'modal-choose.html',
})
export class ModalChoose {

      public typeSettings : number;
      public inicialtypeSettings : number;
      public disableButton : boolean;
      public newtypeSettings : number;


      constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
          this.inicialtypeSettings = navParams.get('typeSettings');
          this.typeSettings = navParams.get('typeSettings');
          this.disableButton = true;
      }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalChoose');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }


  disable(){
      if(this.typeSettings != this.inicialtypeSettings){
          this.disableButton = false;
      }
      else{
          this.disableButton = true;
      }
  }

  save(){
      this.newtypeSettings = this.typeSettings;
      let data = {newtypeSettings : this.newtypeSettings}
      this.viewCtrl.dismiss(data);
  }

}

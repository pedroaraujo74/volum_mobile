import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

/**
 * Generated class for the ModalSettings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-settings',
  templateUrl: 'modal-settings.html',
})
export class ModalSettings {

  public typeSettings : number
  public textHeader : string;
  public textHeaderList : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalController: ModalController) {
      
      this.typeSettings = navParams.get('typeSettings');
    
      

      if(this.typeSettings == 0){
        this.textHeader = "Sobre mim"
      }
      else if(this.typeSettings == 1){
        this.textHeader = "Hobbies e interesses"
      }
      else if(this.typeSettings == 2){
        this.textHeader = "Tipos de voluntariado favoritos"
      }
      else if(this.typeSettings == 3){
        this.textHeader = "Historial do voluntariado"
      }
      else if(this.typeSettings == 9){
        this.textHeader = "Privacidade"
        this.textHeaderList = "Quem pode ver a minha actividade"
      }
      else if(this.typeSettings == 10){
        this.textHeader = "Privacidade"
        this.textHeaderList = "Quem me pode contactar"
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSettings');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }

  openModalChoose(){
      const modal = this.modalController.create("ModalChoose", {typeSettings:this.typeSettings});
      modal.present();
  }


}

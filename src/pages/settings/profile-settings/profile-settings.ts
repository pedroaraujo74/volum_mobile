import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html',
})
export class ProfileSettings {

  public headerTitle : string;
  public typeSettings : number;
  public edit = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {

      let type = this.navParams.get('type');

      if(type == 0){
          this.headerTitle = "Alterar foto de perfil";
          this.typeSettings = 0;
      }

      else if(type == 1){
          this.headerTitle = "Alterar foto de capa";
          this.typeSettings = 1;
      }

      else if(type == 2){
          this.headerTitle = "Dados pessoais";
          this.typeSettings = 2;
      }

      else if(type == 3){
          this.headerTitle = "Acerca de mim";
          this.typeSettings = 3;
      }

      else if(type == 4){
          this.headerTitle = "Educação e formação";
          this.typeSettings = 4;
      }

      else if(type == 5){
          this.headerTitle = "Redes sociais";
          this.typeSettings = 5;
      }

      else if(type == 6){
          this.headerTitle = "Verificação de conta";
          this.typeSettings = 6;
      }

      else if(type == 7){
          this.headerTitle = "Desativar conta";
          this.typeSettings = 7;
      }

      else if(type == 8){
          this.headerTitle = "Alterar senha";
          this.typeSettings = 8;
      }

      else{
          this.navCtrl.push("Tabs");
      }
      
  }

  ionViewDidLoad() {
    
  }

  openPopOver(ev, x){
      let typeNumber = x;
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '5', userId: '1', typeSettings: typeNumber});
      popover.present({
          ev: ev
      });
  }

}

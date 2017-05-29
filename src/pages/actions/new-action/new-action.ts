import { ActionsService } from './../../../services/actions.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from "ng2-validation/dist";


@IonicPage()
@Component({
    selector: 'page-new-action',
    templateUrl: 'new-action.html',
    providers: [ActionsService]
})
export class NewAction {

    public newAction : FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController,  public _fb: FormBuilder) {
    }

    ionViewDidLoad() {
       this.newAction = this._fb.group({
            email: ['', [Validators.required, Validators.minLength(3), CustomValidators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    //POPOVER HEADER
    openMenusHeader(ev){
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
        popover.present({
          ev: ev
        });
    }

    openModalCategory(){
        const modal = this.modalController.create("ModalCartegory");
        modal.present();
    }

    openModalLocation(){
        const modal = this.modalController.create("ModalLocation");
        modal.present();
    }

}

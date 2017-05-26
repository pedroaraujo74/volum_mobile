import { EntryService } from './../entry.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from "ng2-validation/dist";

@IonicPage()
@Component({
    selector: 'page-register2',
    templateUrl: 'register2.html',
    providers: [EntryService]
})
export class Register2 {

    // DATA
    public type;
    public name;

    //FORM
    public registo2: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _fb: FormBuilder, public toastCtrl: ToastController, public entryService: EntryService) {

        //GET DATA
        this.type = this.navParams.get('type');
        this.name = this.navParams.get('name');

        this.registo2 = this._fb.group({
            email: ['', [Validators.required, Validators.minLength(3), CustomValidators.email]],
        });

    }

    validate() {
        if (this.registo2.controls.email.errors) {
            if (this.registo2.controls.email.value != "") {
                if (this.registo2.controls.email.invalid == true) {
                    let toast = this.toastCtrl.create({
                        message: 'Email inválido!',
                        duration: 3000,
                        cssClass: "toast-error"
                    });
                    toast.present();
                }
            }
        }
        
    }

    onSubmit(value, valid) {
        this.registo2.controls.email.markAsTouched();
        if (valid == true) {
            this.entryService.checkEmail(value.email).then((res: any) => {
                if (res.success) {
                    this.navCtrl.push("Register3", {type: this.type, name: this.name, email: value.email});  
                }
                else {
                    let toast = this.toastCtrl.create({
                        message: 'Este email já se encontra registado!!',
                        duration: 3000,
                        cssClass: "toast-error"
                    });
                    toast.present();
                }
            })
        }
    }
}

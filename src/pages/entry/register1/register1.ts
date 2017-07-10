import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
    selector: 'page-register1',
    templateUrl: 'register1.html',
})
export class Register1 {

    // DATA
    public type;
    public name: string;
    public surname: string;

    //FORM 
    public registo1: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _fb: FormBuilder, public toastCtrl: ToastController) {

        // GET DATA
        this.type = this.navParams.get('type');

        if (this.type == 1) {
            this.registo1 = this._fb.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-z\u00E0-\u00FC]+$/i)]],
                surname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-z\u00E0-\u00FC]+$/i)]],
            });
        }
        else {
            this.registo1 = this._fb.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-z\u00E0-\u00FC]+$/i)]],
            });
        }
    }

    validate(type) {
        let value = type;

        if (this.type == 1) {
            if (value == 0 && this.registo1.controls.name.errors) {
                if (this.registo1.controls.name.value != "") {
                    if (this.registo1.controls.name.errors.pattern) {
                        let toast = this.toastCtrl.create({
                            message: 'Nome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else if (this.registo1.controls.name.errors.minlength) {
                        let toast = this.toastCtrl.create({
                            message: 'O nome inserido é muito pequeno!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else {
                        let toast = this.toastCtrl.create({
                            message: 'Campo nome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                }
            }
            else if (value == 1 && this.registo1.controls.surname.errors) {
                if (this.registo1.controls.surname.value != "") {
                    if (this.registo1.controls.surname.errors.pattern) {
                        let toast = this.toastCtrl.create({
                            message: 'Sobrenome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else if (this.registo1.controls.surname.errors.minlength) {
                        let toast = this.toastCtrl.create({
                            message: 'O sobrenome é muito pequeno!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else {
                        let toast = this.toastCtrl.create({
                            message: 'Campo sobrenome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                }
            }
        }
        else {
            if (value == 0 && this.registo1.controls.name.errors) {
                if (this.registo1.controls.name.value != "") {
                    if (this.registo1.controls.name.errors.pattern) {
                        let toast = this.toastCtrl.create({
                            message: 'Nome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else if (this.registo1.controls.name.errors.minlength) {
                        let toast = this.toastCtrl.create({
                            message: 'O nome inserido é muito pequeno!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                    else {
                        let toast = this.toastCtrl.create({
                            message: 'Campo nome inválido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                }
            }
        }
    }

    onSubmit(value, valid) {
        if (this.type == 1) {
            this.registo1.controls.name.markAsTouched();
            this.registo1.controls.surname.markAsTouched();
            let completeName = value.name + " " + value.surname;
            if (valid == true) {
                this.navCtrl.push("Register2", { type: this.type, name: completeName });
            }
        }
        else {
            this.registo1.controls.name.markAsTouched();
            if (valid == true) {
                this.navCtrl.push("Register2", { type: this.type, name: value.name });
            }
        }
    }
}





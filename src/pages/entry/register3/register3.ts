import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register3',
  templateUrl: 'register3.html',
})
export class Register3 {

    // DATA
    public type;
    public name;
    public email;

    // FORM
    public registo3: FormGroup;

    // DISABLE
    public disabledConfirmPassword : boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _fb: FormBuilder, public toastCtrl: ToastController) {
        
        // GET DATA
        this.type = this.navParams.get('type');
        this.name = this.navParams.get('name');
        this.email = this.navParams.get('email');

        // DISABLE
        this.disabledConfirmPassword = true;

        this.registo3 = this._fb.group({
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        });

    }

    validate(value){
        if(value == 0 && this.registo3.controls.password.errors){
            if (this.registo3.controls.password.value != "") {
                if(this.registo3.controls.password.errors.minlength){
                    let toast = this.toastCtrl.create({
                        message: 'Password inválida!',
                        duration: 3000,
                        cssClass: "toast-error"
                    });
                        toast.present();   
                }
            }
        }
        else if(value == 0 && !this.registo3.controls.password.errors){
             this.disabledConfirmPassword = false;
        }
        else if(value == 1 && this.registo3.controls.confirmPassword.errors){
            if (this.registo3.controls.confirmPassword.value != "") {
                if(this.registo3.controls.confirmPassword.errors.minlength){
                    let toast = this.toastCtrl.create({
                        message: 'Password inválida!',
                        duration: 3000,
                        cssClass: "toast-error"
                    });
                        toast.present();   
                }
            }
        }
    }

    onSubmit(value, valid) {
        this.registo3.controls.password.markAsTouched();
        this.registo3.controls.confirmPassword.markAsTouched();
        if(this.registo3.controls.password.value == this.registo3.controls.confirmPassword.value){
            if (valid == true) {
                if(this.type == 0){
                    this.navCtrl.push("Register4", {type: this.type, name: this.name, email: this.email, password: value.password}); 
                }
                else{
                    this.navCtrl.push("Register6", {type: this.type, name: this.name, email: this.email, password: value.password}); 
                } 
            }
        }
        else{
            let toast = this.toastCtrl.create({
                message: 'As senhas não coincidem!',
                duration: 3000,
                cssClass: "toast-error"
            });
            toast.present();
        }
    }
}

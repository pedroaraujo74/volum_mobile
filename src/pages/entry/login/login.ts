import { AuthenticationService } from './../../../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from "ng2-validation/dist";


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [AuthenticationService]
})
export class Login {

    //FORM 
    public login: FormGroup; 

    constructor(public navCtrl: NavController, public navParams: NavParams, public _fb: FormBuilder, public toastCtrl: ToastController, public authenticationService: AuthenticationService) {
        this.login = this._fb.group({
            email: ['', [Validators.required, Validators.minLength(3), CustomValidators.email]],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    validate(value){
        if(value == 0){
            if (this.login.controls.email.errors) {
                if (this.login.controls.email.value != "") {
                    if (this.login.controls.email.invalid == true) {
                        let toast = this.toastCtrl.create({
                            message: 'O campo email está mal preenchido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();
                    }
                }
            }
        }
        else{
            if(this.login.controls.password.errors){
                if (this.login.controls.password.value != "") {
                    if(this.login.controls.password.errors.minlength){
                        let toast = this.toastCtrl.create({
                            message: 'O campo password está mal preenchido!',
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                            toast.present();   
                    }
                }
            }
        }       
    }

    onSubmit(value, valid){
        this.login.controls.email.markAsTouched();
        this.login.controls.password.markAsTouched();
        console.log("wtf")
        if (valid = true){
            this.authenticationService.login(value).then(res => {
                if (res.success) {
                    this.navCtrl.push("Tabs");
                }
                else{
                    let toast = this.toastCtrl.create({
                            message: res.message,
                            duration: 3000,
                            cssClass: "toast-error"
                        });
                        toast.present();  
                }
            })
            .catch(err => {
                 
            }); 
        }
    }

   

}

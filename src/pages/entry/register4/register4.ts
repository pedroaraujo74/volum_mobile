import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register4',
  templateUrl: 'register4.html',
})
export class Register4 {

    // DATA
    public type;
    public name;
    public email;
    public password;

    // FORM
    public registo4: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, public _fb: FormBuilder) {

        // GET DATA
        this.type = this.navParams.get('type');
        this.name = this.navParams.get('name');
        this.email = this.navParams.get('email');
        this.password = this.navParams.get('password');

        this.registo4 = this._fb.group({
            birthday: ['', [Validators.required]],
        });

    }

    onSubmit(value, valid) {
        this.registo4.controls.birthday.markAsTouched();
        if (valid == true) {
             this.navCtrl.push("Register5", {type: this.type, name:this.name, email: this.email, password: this.password, birthday: value.birthday});  
        }
    }

}

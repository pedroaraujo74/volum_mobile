import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-register5',
    templateUrl: 'register5.html',
})
export class Register5 {

    // DATA
    public type;
    public name;
    public email;
    public password;
    public birthday;

    // FORM
    public gender;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        // GET DATA
        this.type = this.navParams.get('type');
        this.name = this.navParams.get('name');
        this.email = this.navParams.get('email');
        this.password = this.navParams.get('password');
        this.birthday = this.navParams.get('birthday');
        this.gender = 0;

    }

    onSubmit() {
        this.navCtrl.push("Register6", { type: this.type, name: this.name, email: this.email, password: this.password, birthday: this.birthday, gender: this.gender });
    }
}

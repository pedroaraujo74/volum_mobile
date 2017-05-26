import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-register0',
    templateUrl: 'register0.html',
})

export class Register0 {

    public type;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.type = 0;
    }

    onSubmit(){
        this.navCtrl.push("Register1", {type: this.type});  
    }

}

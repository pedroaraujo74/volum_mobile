import { AuthenticationService } from './../../../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-register7',
    templateUrl: 'register7.html',

})

export class Register7 {

    constructor(public navCtrl: NavController, public navParams: NavParams, public authenticationService: AuthenticationService) {
        setTimeout(() => {
            this.login();
        }, 2000)
    }


    login() {
        let value = {
            email: this.navParams.get('email'),
            password: this.navParams.get('password')
        }

        this.authenticationService.login(value).then(res => {
            console.log("res", res)
            if (res.success) {
                this.authenticationService.reloadUser(res.id_user, true).then(result => {


                    this.navCtrl.push("Tabs")
                        .then(test => {
                            location.reload();
                        })




                })

            }
            else {
                console.log("erro");
            }

        });
    }

}

import { AuthenticationService } from './../../../shared/auth/authentication.service';
import { VolsService } from './../../../services/vols.service';
import { UsersService } from './../../../services/users.service';
import { Profile } from './../profile/profile';
import { NotificationsService } from './../../services/notifications.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-finish',
    templateUrl: 'finish.html',
    providers: [UsersService, VolsService]
})

export class Finish {

    public all_classification: number;
    public vol: any = {};
    public last_message: any;
    public score: number;
    public message: any;
    public scoreStatus: any;
    constructor(public navCtrl: NavController, public auth: AuthenticationService, public navParams: NavParams, public popoverCtrl: PopoverController, public volsService: VolsService, public userService: UsersService) {

    }

    ionViewWillEnter() {


        this.auth.userPromise.then(res => {
            console.error(res);
            this.vol['id_user'] = res.user.id_user;
            this.vol['id_vol'] = this.navParams.get('id_vol')
            this.vol['name'] = this.navParams.get('name')
            this.vol['user_name'] = this.navParams.get('user_name')
            this.vol['photo_url'] = this.navParams.get('photo_url');

            this.getMessage(this.vol['id_vol']);

            this.volsService.userVolScore(res.user.id_user, this.vol.id_vol).then(score => {
                console.warn(this.scoreStatus);

                this.scoreStatus = score.score;
            })

            console.warn(this.vol)

        })




    }


    getNumber = function (num) {
        let number = Math.round(num);
        if (num < 0) {
            number = Math.abs(number);
        }

        return new Array(number);
    }

    setScore(classification) {
        this.all_classification = (classification + 1);
        this.score = classification + 1;
    }

    submitTestimony() {
        console.log("message:" + this.message);
        console.log("classification:" + this.score);
        console.log("id_vol:" + this.vol.id_vol);

        let body = {
            message: this.message,
            classification: this.score,
            id_user2: this.vol.id_user,
            id_vol: this.vol.id_vol,
            type: 1,
        }
        console.log(body)
        this.volsService.insertTestimony(body).then(res => {
            if (res.success) {
                this.navCtrl.pop();
            }
        });
    }

    getMessage(id_vol) {
        this.volsService.getMessage(id_vol).then(
            res => {
                this.last_message = res.message;
                console.warn(res)
            }
        )
    }
}
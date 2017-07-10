import { VolsService } from './../../services/vols.service';
import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../shared/auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
    providers: [UsersService, VolsService]
})
export class Profile {
    public popover = null;
    public tabsProfile;
    public user: any = {};
    public state: any;
    public my_applies = [];
    public my_vols = [];
    public all_vols = [];
    public active_id: any;
    public user_followers = [];
    public inst_followers = [];
    public education = [];
    public scoreReady: boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, public volsService: VolsService, public userService: UsersService, public popoverCtrl: PopoverController, public auth: AuthenticationService) {
        this.tabsProfile = "actions";
        this.auth.userPromise.then(res => {
            this.active_id = res.user.id_user;
            console.log("PARAMS", this.navParams.get('id_user'))
            console.log("RESSS", res);
            if (!this.navParams.get('id_user')) {

                this.user = res.user;
                console.log(this.user);


                this.userService.getProfile(this.user.id_user).then(result => {
                    console.log(result);


                    this.user = result.user;

                    this.checkFollow();
                    this.getEducation(this.user.id_user);
                    this.getFollowers(this.user.id_user)

                    if (this.user['type'] == 1) {
                        this.volsService.getMyVols(this.user.id_user).then(res => {
                            this.my_vols = res.vols;
                            console.log(this.my_vols)

                        }).catch(err => console.log(err));
                    } else {
                        this.volsService.getVolHistory(this.user.id_user)
                            .then(res => {
                                this.all_vols = res.vols;
                                console.log("history", this.all_vols)
                            })
                            .catch(err => console.log(err));
                    }
                }).catch(error => {
                    console.error(error);
                })

            } else {
                this.userService.getProfile(this.navParams.data.id_user).then(result => {
                    console.log(result);
                    this.user = result.user;
                    this.checkFollow();

                    this.userService.getScore(this.navParams.data.id_user).then(res => {
                        console.log("SCORE", res.score)
                        this.user['score_number'] = res.score;
                        this.user['score'] = this.getNumber(res.score);
                        this.user['negative_score'] = this.getNumber(res.score - 5);
                        this.scoreReady = true;
                        console.log(this.user.score)

                    });
                    this.getEducation(this.user.id_user);


                    this.getFollowers(this.navParams.data.id_user)

                    if (this.user['type'] == 1) {
                        this.volsService.getMyVols(this.user.id_user).then(res => {
                            this.my_vols = res.vols;
                            console.log(this.my_vols)

                        }).catch(err => console.log(err));
                    } else {
                        this.volsService.getVolHistory(this.user.id_user)
                            .then(res => {
                                this.all_vols = res.vols;
                                console.log("history", this.all_vols)
                            })
                            .catch(err => console.log(err));
                    }
                }).catch(error => {
                    console.error(error);
                })
            }
        });


    }
    getEducation(id) {
        this.userService.getEducation(id).then(res => {
            this.education = res.education;
            console.log("EUCAATIO", this.education)
        })
    }

    follow(id_user) {
        console.log("ID", id_user);
        this.userService.follow(this.user.id_user).then(res => {
            this.state = 1;
            console.log(res);
        });
    }
    unfollow(id_user) {
        this.userService.unfollow(this.user.id_user).then(res => {
            this.state = 0;
            console.log(res);

        });
    }

    visit(id_vol, name) {

        this.navCtrl.push("CardDetails", { volId: id_vol, volName: name });

    }

    engageConversation() {
        this.userService.engageConversation(this.user.id_user).then(res => {
            this.navCtrl.push("ChatMessage", { id_conversation: res.id_conversation, name: this.user.name, photo: this.user.photo_url });

        }).catch(err => {

        })
    }


    getNumber(num) {
        let number = Math.round(num);
        if (num < 0) {
            number = Math.abs(number);
        }
        return new Array(number);
    }

    checkFollow() {

        this.userService.checkState(this.user.id_user).then(res => {
            this.state = res.state;
            console.log(this.state);
        });
    }
    getFollowers(id) {
        this.userService.listFollows(id, 1).then(res => {
            this.user_followers = res.users;
        })
        this.userService.listFollows(id, 2).then(res => {


            this.inst_followers = res.institutions;
            console.log("list", this.inst_followers)

        })
    }





    ionViewDidLoad() {
        console.log('ionViewDidLoad Profile');

    }
    getDay(date: Date) {
        console.log("123", date.getDay());
        return date.getDay();
    }

    //POPOVER HEADER
    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '1', userId: '1' });
        popover.present({
            ev: ev
        });
    }

}

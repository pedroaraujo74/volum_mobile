import { EntryService } from './../entry.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-register6',
    templateUrl: 'register6.html',
    providers: [EntryService]
})
export class Register6 {

    // DATA
    public type;
    public name;
    public email;
    public password;
    public birthday;
    public gender;

    public categories
    public categoryChecked = [];

    public disableButton: boolean;
    public count: number = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams, public entryService: EntryService) {

        // GET DATA
        this.type = this.navParams.get('type');
        this.name = this.navParams.get('name');
        this.email = this.navParams.get('email');
        this.password = this.navParams.get('password');
        this.birthday = this.navParams.get('birthday');
        this.gender = this.navParams.get('gender');

        this.entryService.getCategories().then((res: any) => {
            console.log(res);
            this.categories = res.categories;
            for (let i = 0; i < this.categories.length; i++) {
                this.categories[i].checked = false;
            }
        });
        this.disableButton = true;
    }

    checked() {
        this.count = 0;
        for (let i = 0; i < this.categories.length; i++) {
            if (!this.categories[i].checked) {
                this.count++;
            }
        }
        if (this.count == this.categories.length) {
            this.disableButton = true;
        }
        else {
            this.disableButton = false;
        }
    }

    onSubmit() {
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].checked) {
                this.categoryChecked.push(this.categories[i].id_category);
            }
        }

        this.entryService.registerUser(this.email, new Date(this.birthday), this.name, 0, this.type, this.password, null).then((res: any) => {
            if (res.success) {
                this.navCtrl.push("Register7", { email: this.email, password: this.password })

            } else {
                console.log(res)
            }
        })
            .catch(err => {
                console.log("ERRO")
            });

        this.categoryChecked = [];
    }

}

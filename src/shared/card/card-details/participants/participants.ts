import { VolsService } from './../../../../services/vols.service';
import { Users } from './../../../../components/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
  providers: [VolsService]
})
export class Participants {

    tabs:any;
    public volId : any;
    public confirmeds : any;
    public candidates : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public volsService : VolsService,  public loadingCtrl: LoadingController) {
        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();
        
        this.tabs = this.navParams.get('participants');
        this.volId = this.navParams.get('volId');
        this.getConfirmed(this.volId, 10);

        if(this.tabs == "candidates"){
            this.getCandidates(this.volId, 10);
            this.getConfirmed(this.volId, 10);
            loading.dismiss();
        }
        else if(this.tabs == "confirmed"){
            this.getConfirmed(this.volId, 10);
            this.getCandidates(this.volId, 10);
            loading.dismiss();
        }
        
    }

    // GET CONFIRMED 
    getConfirmed(volId, amount) {
        this.volsService.getConfirmed(volId, amount)
        .then(res => {
            this.confirmeds = res.users;
            console.log(res.users);
        })
        .catch(err => console.log(err));
    }

    getCandidates(volId, amount) {
        this.volsService.getCandidates(volId, amount)
        .then(res => {
            this.candidates = res.users;
        })
        .catch(err => console.log(err));
    }

    


}

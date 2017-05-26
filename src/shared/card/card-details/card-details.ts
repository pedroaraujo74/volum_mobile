import { VolsService } from './../../vols.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
    selector: 'page-card-details',
    templateUrl: 'card-details.html',
    providers: [VolsService]
})
export class CardDetails {

    public tabs;
    public getVolId: any;
    public volDetails = {};
    public volName: string;
    
    // ADDRESS
    public addressData: any;
    public address: any;
    public addressSub : any;
    public lat: any;
    public lng: any;

    // TIME
    public start_time;
    public end_time;
    public hora_inicio: any;
    public hora_fim: any;
    public minutos_inicio: any;
    public minutos_fim: any;

    // CONFIRMED VOLS
    public confirmedNumber: any;
    public numberConfirmeds: any;
    public confirmeds: any;

    // CANDIDATES VOLS
    public candidatesNumber: any;
    public numberCandidates: any;
    public candidates: any;

    // APPLY TO VOL


    constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public popoverCtrl: PopoverController, public volsService: VolsService, public loadingCtrl: LoadingController) {
        moment.locale('pt-pt');
        this.tabs = 'about';
        this.getVolId = navParams.get('volId');
        this.volName = navParams.get('volName');

        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();

        this.volsService.getVolDetails(this.getVolId).then(res => {
            this.volDetails = res.vol;
    
            // ADDRESS
            this.lat = res.vol.lat;
            this.lng = res.vol.lng;
            if(this.lat != 0 && this.lng != 0){
                this.getAddress(res.vol.lat, res.vol.lng);
            }

            // TIME
            this.start_time = res.vol.start_time;
            this.end_time = res.vol.end_time;

            if((this.start_time != null && this.end_time != null) || (this.start_time != null && this.end_time == null)){
                this.getTime(res.vol.start_time, res.vol.end_time)
            }

            // CONFIRMED
            this.getConfirmed(res.vol.id_vol, 10);
            this.countConfirmeds(res.vol.id_vol)

            // CANDIDATES
            this.getCandidates(res.vol.id_vol, 10);
            this.countCandidates(res.vol.id_vol);

            loading.dismiss()
        });
    }

    getAddress(lat, lng){
        if(this.lat && this.lng){
            this.volsService.getAddress(lat, lng).then(res=>{
                this.addressData = res.results;
                this.address = this.addressData[0].formatted_address;
                this.addressSub = this.addressData[0].formatted_address;
            })
        }
    }

    getTime(start, end) {
        if(start != null && end != null){
            this.hora_inicio = start.slice(0, 2);
            this.minutos_inicio = start.slice(3, 5);
            this.hora_fim = end.slice(0, 2);
            this.minutos_fim = end.slice(3, 5);
        }
        else{
            this.hora_inicio = start.slice(0, 2);
            this.minutos_inicio = start.slice(3, 5);
        }
    }

    // GET CONFIRMED 
    getConfirmed(volId, amount) {
        this.volsService.getConfirmed(volId, amount)
        .then(res => {
            this.confirmeds = res.users;
        })
        .catch(err => console.log(err));
    }

    // COUNT CONFIRMED
    countConfirmeds(volId) {
        this.volsService.countConfirmeds(volId)
        .then(res => {
            this.numberConfirmeds = res.count;
        })
        .catch(err => console.log(err));
    }

    // GET CANDIDATES
    getCandidates(volId, amount) {
        this.volsService.getCandidates(volId, amount)
        .then(res => {
            this.candidates = res.users;
        })
        .catch(err => console.log(err));
    }

    // COUNT CANDIDATES
    countCandidates(volId) {
        this.volsService.countCandidates(volId)
        .then(res => {
            this.numberCandidates = res.count;
        })
        .catch(err => console.log(err));
    }

    // APPLY TO VOL
    /*
    apply(id_vol) {
        this.volsService.apply(this.context.id_user, id_vol).then(res => {
        });
    }
    */

    goParticipants(value) {
        this.navCtrl.push("Participants", {
            participants: value,
            volId: this.getVolId
        });
    }

    openModalNewDiscussion() {
        const modal = this.modalController.create("ModalDiscussion");
        modal.present();
    }

    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
        popover.present({
            ev: ev
        });
    }

    openMenus(ev, creatorId, volId){
        let popover = this.popoverCtrl.create("Popover", {creatorId: creatorId, volId: volId, popOver: 0});
        popover.present({
            ev: ev
        });
    }

    



}

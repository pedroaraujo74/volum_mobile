import { VolsService } from './../../../services/vols.service';
import { AuthenticationService } from './../../auth/authentication.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, LoadingController, ToastController, AlertController } from 'ionic-angular';
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

    //LOGGED USER
    public user = {}
    public userId: any;
    public name: any;
    public photo: any;

    // VOL CREATER
    public volCreator : any;

    // ADDRESS
    public addressData: any;
    public address: any;
    public addressSub: any;
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

    // COMMENTS
    public comments: any;

    // APPLY TO VOL
    public state: Number;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalController: ModalController, public popoverCtrl: PopoverController, public volsService: VolsService, public loadingCtrl: LoadingController, public auth: AuthenticationService, public toastCtrl: ToastController, public alertCtrl: AlertController) { }

    ionViewDidLoad() {
        moment.locale('pt-pt');

        let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();

        // SET TABS
        this.tabs = 'about';

        // GET DATA PARAMS
        this.getVolId = this.navParams.get('volId');
        this.volName = this.navParams.get('volName');

        // GET ID LOGGED USER
        this.auth.userPromise.then(res => {
            this.user = res.user;
            this.userId = res.user.id_user;
            console.log("USER", this.user);
        });

        // GET VOL DETAILS DATA
        this.volsService.getVolDetails(this.getVolId).then(res => {
            this.volDetails = res.vol;

            this.volCreator = res.vol.user.id_user;
            console.log("VOLs", res.vol);

            // ADDRESS
            this.lat = res.vol.lat;
            this.lng = res.vol.lng;
            if (this.lat != 0 && this.lng != 0) {
                this.getAddress(res.vol.lat, res.vol.lng);
            }

            // TIME
            this.start_time = res.vol.start_time;
            this.end_time = res.vol.end_time;

            if ((this.start_time != null && this.end_time != null) || (this.start_time != null && this.end_time == null)) {
                this.getTime(res.vol.start_time, res.vol.end_time)
            }

            // CONFIRMED
            this.getConfirmed(res.vol.id_vol, 10);
            this.countConfirmeds(res.vol.id_vol)

            // CANDIDATES
            this.getCandidates(res.vol.id_vol, 10);
            this.countCandidates(res.vol.id_vol);

            // GET COMMENTS
            this.getComments()

            // APPLY
            this.checkState(res.vol.id_vol);

            // HIDE LOADING
            loading.dismiss()
        });
    }

    getAddress(lat, lng) {
        if (this.lat && this.lng) {
            this.volsService.getAddress(lat, lng).then(res => {
                this.addressData = res.results;
                this.address = this.addressData[0].formatted_address;
                this.addressSub = this.addressData[0].formatted_address;
            })
        }
    }

    getTime(start, end) {
        if (start != null && end != null) {
            this.hora_inicio = start.slice(0, 2);
            this.minutos_inicio = start.slice(3, 5);
            this.hora_fim = end.slice(0, 2);
            this.minutos_fim = end.slice(3, 5);
        }
        else {
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

    // GET COMMENTS
    getComments() {
        this.volsService.getComments(this.getVolId)
            .then(res => {
                this.comments = res.comments;
                console.log(res.comments)
            })
            .catch(err => console.log(err));
    }

    applyConfirmAlert(id_vol) {
        let confirm = this.alertCtrl.create({
            title: 'Confirmar candidatura',
            message: 'Ao confirmar, compromete-se a participar na ação de voluntariado.',
            buttons: [
                {
                    text: 'Fechar',
                    cssClass: 'closeAlert',
                    
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Confirmar',
                    cssClass: 'confirmAlert',
                    handler: () => {
                        this.applyConfirm(id_vol);
                    }
                }
            ]
        });
        confirm.present();
    }

    applyCancelarAlert(id_vol) {
        let confirm = this.alertCtrl.create({
            title: 'Cancelar candidatura',
            message: 'Tem mesmo a certeza que deseja cancelar a sua candidatura?',
            buttons: [
                {
                    text: 'Fechar',
                    cssClass: 'closeAlert',
                    handler: () => {
                    }
                },
                {
                    text: 'Confirmar',
                    cssClass: 'confirmAlert',
                    handler: () => {
                        if(this.state == 1){
                            this.applyCancel(id_vol);
                        }
                        else if(this.state == 2){
                            this.applyCancelConfirm(id_vol);
                        }
                    }
                }
            ]
        });
        confirm.present();
    }


    // APPLY CONFIRM
    applyConfirm(id_vol) {
        this.volsService.apply(this.userId, id_vol).then(res => {
            let toast = this.toastCtrl.create({
                message: 'Candidatura enviada com sucesso!',
                duration: 3000,
                cssClass: "toast-success",
            });
            toast.present();
            this.state = 1;
            this.countCandidates(id_vol);
            this.getCandidates(id_vol, 10);
        })
            .catch(err => {
        });
    }

    // APPLY CANCEL
    applyCancel(id_vol) {
        this.volsService.cancelApply(this.userId, id_vol).then(res => {
            let toast = this.toastCtrl.create({
                message: 'Candidatura cancelada com sucesso!',
                duration: 3000,
                cssClass: "toast-success",
            });
            toast.present();
            this.state = 0;
            this.countCandidates(id_vol);
            this.getCandidates(id_vol, 10);
        });
    }

    applyCancelConfirm(id_vol) {
        this.volsService.cancelApply(this.userId, id_vol).then(res => {
            let toast = this.toastCtrl.create({
                message: 'Candidatura cancelada com sucesso!',
                duration: 3000,
                cssClass: "toast-success",
            });
            toast.present();
            this.state = 0;
            this.countConfirmeds(id_vol);
            this.getConfirmed(id_vol, 10);
        });
    }

    // CHECK STATE VOL
    checkState(id_vol) {
        this.volsService.checkState(this.userId, id_vol).then(res => {
            this.state = res.state;
            console.log(this.state)
        });
    }

    goParticipants(value) {
        this.navCtrl.push("Participants", {
            participants: value,
            volId: this.getVolId
        });
    }

    openModalNewDiscussion() {
        let modal = this.modalController.create("ModalDiscussion", { user: this.user, volId: this.getVolId });
        modal.onDidDismiss(data => {
            this.getComments();
        });
        modal.present();
    }

    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
        popover.present({
            ev: ev
        });
    }

    openMenus(ev, creatorId, volId) {
        let popover = this.popoverCtrl.create("Popover", { creatorId: creatorId, volId: volId, popOver: 0 });
        popover.present({
            ev: ev
        });
    }





}

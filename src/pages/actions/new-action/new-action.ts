import { NewActionsService } from './../../../services/newActions.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from "ng2-validation/dist";
import { Camera } from "ionic-native";

@IonicPage()
@Component({
    selector: 'page-new-action',
    templateUrl: 'new-action.html',
    providers: [NewActionsService]
})
export class NewAction {

    public newAction: FormGroup;

    // CATEGORY
    public categorySelectedChecked: boolean = false;
    public categoryCheckedId: any;
    public categoryCheckedName: any;

    // LOCATION
    public locationChecked: boolean = false;
    public locationLat: any;
    public locationLng: any;
    public locationName = {};
    public address: any;
    
    // GALLERY
    public base64Image : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController, public _fb: FormBuilder, public newActionsService: NewActionsService) {
    
        this.newAction = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(3)]],
            insurance:[true],
            publicAction:[true],
            acceptCandidates:[true],
            publicComments:[true],
            dateBegin:['',[Validators.required]],
            dateEnd:[],
            timeBegin:['',[Validators.required]],
            timeEnd:[],  
            dailyHours:[]
        });

    }

    ionViewDidLoad() {

    }


    //POPOVER HEADER
    openMenusHeader(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
        popover.present({
            ev: ev
        });
    }

    // MODAL CATEGORY
    openModalCategory() {
        if (this.categorySelectedChecked) {
            const modal = this.modalController.create("ModalCartegory", { categorySelected: this.categoryCheckedId });
            modal.onDidDismiss(data => {
                if (data) {
                    this.categorySelectedChecked = true;
                    this.categoryCheckedName = data.name_category;
                    this.categoryCheckedId = data.id_category;
                }
            });
            modal.present();
        }

        else {
            const modal = this.modalController.create("ModalCartegory");
            modal.onDidDismiss(data => {
                if (data) {
                    this.categorySelectedChecked = true;
                    this.categoryCheckedName = data.name_category;
                    this.categoryCheckedId = data.id_category;
                }
            });
            modal.present();
        }
    }

    // MODAL LOCATION
    openModalLocation() {
        const modal = this.modalController.create("ModalLocation");
        modal.onDidDismiss(data => {
            if (data) {
                this.locationChecked = true;
                this.locationName = data.formatted_address;
                this.address = this.locationName;
                this.locationLat = data.geometry.location.lat;
                this.locationLng = data.geometry.location.lng;
            }
        });
        modal.present();
    }

    // CHOOSE PHOTOS





    /*
    chooseImages(){
        Camera.getPicture({
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
        console.log(err);
    });
    }
    */
}

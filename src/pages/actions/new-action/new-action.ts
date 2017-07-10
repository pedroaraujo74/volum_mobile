import { NewActionsService } from './../../../services/newActions.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Platform } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from "ng2-validation/dist";
import { Camera, CameraOptions } from "@ionic-native/camera";


@IonicPage()
@Component({
    selector: 'page-new-action',
    templateUrl: 'new-action.html',
})
export class NewAction {

    public form: FormGroup;

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
    public base64Image: any;
    public imageSrc: string;

    //DISABLE GALLERY
    public disableGallery: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController, public _fb: FormBuilder, public newActionsService: NewActionsService, public camera: Camera, public platform: Platform) {

        if (this.platform.is('ios') || this.platform.is('android') || this.platform.is('windows')) {
            this.disableGallery = false;
        }

        this.form = this._fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(3)]],
            insurance: [true],
            category: [],
            publicAction: [true],
            photos: [[]],
            acceptCandidates: [true],
            publicComments: [true],
            date_begin: ['', [Validators.required]],
            date_end: [],
            timeBegin: ['', [Validators.required]],
            timeEnd: [],
            dailyHours: []
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
    choosePhotos() {
        let cameraOptions: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
        }

        this.camera.getPicture(cameraOptions)
            .then(file_uri => {
                this.imageSrc = 'data:image/jpeg;base64,' + file_uri;
             
            });
    }


    onSubmit(form: any) {

        console.log(this.categoryCheckedId);
        console.log(this.categorySelectedChecked);
        form.value.category = this.categoryCheckedId;

        console.log('you submitted value:', form.value);
        form.value.photos = [this.imageSrc]

        console.log("VALUE", form.value);
        this.newActionsService.newAction(form.value).then(res => {
            console.log(res);
  this.navCtrl.push("Tabs");
            if (res.success) {
            } else {


            }
        }).catch(error => console.log(error))
    }


}
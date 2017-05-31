import { NewActionsService } from './../../../../services/newActions.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { FormControl } from '@angular/forms'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';


@IonicPage()
@Component({
    selector: 'page-modal-location',
    templateUrl: 'modal-location.html',
    providers: [NewActionsService]
})
export class ModalLocation {

    public isError: boolean = false;
    public showSpinner: boolean = false;
    public searchInput = new FormControl('')


    public searching = [];
    public searchFailed: any;

    constructor(public navParams: NavParams, public viewCtrl: ViewController, public newActionsService : NewActionsService,  public loadingCtrl: LoadingController) {
       
    }

    ionViewDidLoad() {
        this.searchInput.valueChanges.filter((term) => {
            if (term) {
                this.showSpinner = true
                this.isError = false;
                return term
            } 
            else {
                this.searching = [];
                this.showSpinner = false;
            }
        })
        .debounceTime(500)
        .switchMap(term => this.newActionsService.search(term))
        .do(() => this.showSpinner = false)
        .subscribe(
        results => {
          console.log(results)
            this.searching = results;
        },
        err => this.isError = true
      )
    }

    setAddress(value){
        let data = value;
        this.viewCtrl.dismiss(data);  
    }
    

    dismiss() {
        this.viewCtrl.dismiss();
    }

}

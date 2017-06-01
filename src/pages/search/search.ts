import { SearchService } from './../../services/search.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { FormControl } from '@angular/forms'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
    providers: [SearchService]
})
export class Search {

    public isError: boolean = false;
    public showSpinner: boolean = false;

    public search_query: any;
    public searchResult: any;
    public elements: any;

    public searchInput = new FormControl('')

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public searchService : SearchService) {
    }

    ionViewDidLoad() {
        this.searchInput.valueChanges.filter((term) => {
            if (term) {
                this.showSpinner = true
                this.isError = false;
                return term
            } 
            else {
                this.elements = [];
                this.showSpinner = false;
            }
        })
        .debounceTime(500)
        .switchMap(term => this.searchService.search(term))
        .do(() => this.showSpinner = false)
        .subscribe(
        results => {
            console.log(results);
            this.searchResult = results;
            if (this.searchResult.success==true) {
                this.elements = this.searchResult.message;
            } 
            else {
                this.elements = 0;
            }
        },
        err => console.log(err)
      )
    }


  //POPOVER HEADER
  openMenusHeader(ev){
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
      popover.present({
          ev: ev
      });
  }

}

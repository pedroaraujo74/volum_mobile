import { NewActionsService } from './../../../../services/newActions.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-cartegory',
  templateUrl: 'modal-cartegory.html',
  providers: [NewActionsService]
})
export class ModalCartegory {

    public categories : any;

    // GET VALUES NEW ACTION
    public categorySelected : any;
    public categorySelectedCheckedId : any;


    // GET VALUES FORM
    public categoryCheckedId : any;
    public categoryCheckedName : any;

    // DISABLE BUTTON SAVE
    public disableButton : boolean;

    constructor(public navParams: NavParams, public viewCtrl: ViewController, public newActionsService : NewActionsService) {
    }

    ionViewDidLoad() {
        this.categorySelected = this.navParams.get("categorySelected");

        if(this.categorySelected){
            this.categorySelectedCheckedId = this.categorySelected;
        }

        this.disableButton = true;

        this.newActionsService.getCategories().then((res: any) => {
            this.categories = res.categories;      
        });
    }

    categoryChecked(id, name){
        this.disableButton = false;
        this.categoryCheckedId = id;
        this.categoryCheckedName = name;
    }


    onSubmit(){
        let data = {};
        data = {id_category:this.categoryCheckedId, name_category: this.categoryCheckedName};
        this.viewCtrl.dismiss(data);      
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

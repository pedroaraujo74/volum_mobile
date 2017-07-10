import { VolsService } from './../../services/vols.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
    selector: 'page-modal-discussion',
    templateUrl: 'modal-discussion.html',
    providers: [VolsService]
})
export class ModalDiscussion {

    public user: any;
    public volId: any;
    public comments: any;

    public discussion: FormGroup;

    constructor(public navParams: NavParams, public viewCtrl: ViewController, public _fb: FormBuilder, public volsService: VolsService) {
        this.user = this.navParams.get('user');
        this.volId = this.navParams.get('volId');

        this.discussion = this._fb.group({
            comment: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    onSubmit() {
        this.sendComment(this.discussion.value.comment)
    }

    sendComment(comment) {
        if (typeof comment == 'string' && comment.length > 0 && comment && comment.replace(/^\s+/g, '').length) {
            this.volsService.sendComment(comment, this.volId).then(res => {

                setTimeout(() => {
                    this.viewCtrl.dismiss()
                }, 251)
            });
        }
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}

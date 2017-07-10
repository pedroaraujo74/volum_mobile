import { Finish } from './finish';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        Finish,
    ],
    imports: [
        IonicPageModule.forChild(Finish),
        MomentModule
    ],
    exports: [
        Finish
    ]
})
export class FinishModule { }

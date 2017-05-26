import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register1 } from './register1';

@NgModule({
  declarations: [
    Register1,
  ],
  imports: [
    IonicPageModule.forChild(Register1),
  ],
  exports: [
    Register1
  ]
})
export class Register1Module {}

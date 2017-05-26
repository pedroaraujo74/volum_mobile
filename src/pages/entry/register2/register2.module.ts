import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register2 } from './register2';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
  declarations: [
    Register2,
  ],
  imports: [
    IonicPageModule.forChild(Register2),
    CustomFormsModule
  ],
  exports: [
    Register2
  ]
})
export class Register2Module {}

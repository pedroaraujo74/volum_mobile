import { CardListModule } from './../../components/card-list/card-list.module';
import { InviteModule } from './../../components/invite/invite.module';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Actions } from './actions';

@NgModule({
  declarations: [
    Actions,
  ],
  imports: [
    IonicPageModule.forChild(Actions),
    InviteModule,
    CardListModule
  ],
  exports: [
    Actions,
  ]
})
export class ActionsModule {}

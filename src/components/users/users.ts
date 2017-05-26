import { Component, Input } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: 'users.html'
})
export class Users {

  @Input() typeUser;

  constructor() {
   
  }

}

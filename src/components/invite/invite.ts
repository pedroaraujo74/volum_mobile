import { Component } from '@angular/core';

@Component({
  selector: 'invite',
  templateUrl: 'invite.html'
})
export class Invite {

  text: string;

  constructor() {
    console.log('Hello Invite Component');
    this.text = 'Hello World';
  }

}

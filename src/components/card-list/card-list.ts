import { Component } from '@angular/core';

@Component({
  selector: 'cardList',
  templateUrl: 'card-list.html'
})

export class CardList {

  text: string;

  constructor() {
      console.log('Hello CardList Component');
      this.text = 'Hello World';
  }

}

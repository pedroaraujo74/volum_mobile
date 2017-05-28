import { Component, Input } from '@angular/core';

@Component({
  selector: 'cardList',
  templateUrl: 'card-list.html'
})

export class CardList {

  @Input() name: string = '123';
  @Input() photo: string;
  @Input() date: Date;

  data: Date = new Date();
  text: string;

  constructor() {
    console.log('Hello CardList Component');
    this.text = 'Hello World';
    console.log("data", this.data)
  }


  ionViewDidLoad() {

  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'cardList',
  templateUrl: 'card-list.html'
})

export class CardList {

  @Input() name: string = '123';
  @Input() photo: string;
  @Input() date: Date;
  @Input() creator: string;



  constructor() {

  }


  ionViewDidLoad() {

  }

}

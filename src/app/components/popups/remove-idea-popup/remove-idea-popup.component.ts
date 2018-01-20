import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remove-idea-popup',
  templateUrl: './remove-idea-popup.component.html',
  styleUrls: ['./remove-idea-popup.component.css']
})
export class RemoveIdeaPopupComponent implements OnInit {
  @Output() cancelEmitter = new EventEmitter<any>();
  @Output() okEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  cancelClick() {
    this.cancelEmitter.emit(null);
  }

  okClick() {
    this.okEmitter.emit(null);
  }
}

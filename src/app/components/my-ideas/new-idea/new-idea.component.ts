import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Idea } from '../../../models/idea';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-new-idea',
  templateUrl: './new-idea.component.html',
  styleUrls: ['./new-idea.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => newIdea', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('void => editIdea', [
        style({
          opacity: 0,
        }),
        animate('0.8s ease-in')
      ])
    ])
  ]
})
export class NewIdeaComponent implements OnInit {
  @Input() idea: Idea;

  ideaClone: Idea;
  inEditMode: boolean;
  animationType: string;

  contentEmpty: boolean;

  @Output() saveIdeaEmitter = new EventEmitter<Idea>();
  @Output() revertEmitter = new EventEmitter<Idea>();
  @Output() deleteIdeaEmitter = new EventEmitter<Idea>();

  @ViewChild('contentInput') contentInputEl: ElementRef;

  constructor() { }

  ngOnInit() {
    if (this.idea.id === undefined) {
      this.animationType = 'newIdea';
      this.editIdea();
    } else {
      this.animationType = 'editIdea';
    }
  }

  changeValue(ee, model, field, step) { // insane hack
    const newVal = model[field] + step;
    model[field] = Math.min(Math.max(newVal, ee.min), ee.max);

    const idea = this.ideaClone;
    idea.average_score = (idea.impact + idea.ease + idea.confidence) / 3;
  }

  saveIdea() {
    this.contentEmpty = this.ideaClone.content.length === 0;

    if (this.ideaClone.content.length > 0) {
      this.idea = this.ideaClone;
      this.inEditMode = false;
      this.ideaClone = undefined;
      this.saveIdeaEmitter.emit(this.idea);

      this.animationType = 'editIdea';
    } else {
      this.contentInputEl.nativeElement.focus();
    }
  }

  editIdea() {
    this.inEditMode = true;
    this.ideaClone = Object.assign({}, this.idea);
  }

  revertIdea() {
    this.inEditMode = false;
    this.ideaClone = undefined;
    if (this.idea.id === undefined) {
      this.revertEmitter.emit(this.idea);
    }
  }

  deleteIdea() {
    this.inEditMode = false;
    this.ideaClone = undefined;
    this.deleteIdeaEmitter.emit(this.idea);
  }
}

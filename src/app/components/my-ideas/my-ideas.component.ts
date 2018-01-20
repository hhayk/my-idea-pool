import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../services/idea.service';
import { Idea } from '../../models/idea';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-my-ideas',
  templateUrl: './my-ideas.component.html',
  styleUrls: ['./my-ideas.component.css']
})
export class MyIdeasComponent implements OnInit {
  isLoading = true;

  page = 1;
  newIdeasLength: number;

  constructor(private ideaService: IdeaService, private popupService: PopupService) { }

  ngOnInit() {
    this.loadIdeas(this.page);
  }

  loadIdeas(page: number) {
    this.ideaService.getIdeas(page, (newIdeasLength: number) => {
      this.isLoading = false;
      this.newIdeasLength = newIdeasLength;
    }, () => {
      this.isLoading = false;
    });
  }

  loadMore() {
    this.loadIdeas(++this.page);
  }

  createIdea() {
    this.ideaService.ideas.unshift(new Idea());
  }

  saveIdea(idea: Idea) {
    if (idea.id === undefined) {
      this.ideaService.createIdea(idea);
    } else {
      this.ideaService.updateIdea(idea);
    }
  }

  revertIdea(idea) {
    this.ideaService.ideas.splice(this.ideaService.ideas.indexOf(idea), 1);
  }

  deleteIdea(idea) {
    this.popupService.removeIdeaPopup(idea, () => this.ideaService.deleteIdea(idea));
  }
}

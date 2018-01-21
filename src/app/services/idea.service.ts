import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Idea } from '../models/idea';
import 'rxjs/add/operator/map';

@Injectable()
export class IdeaService {
  ideas: Array<Idea> = [];

  constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

  createIdea(idea: Idea, success: () => void = () => { }, error: (err: any) => void = () => { }) {
    this.http
      .post(this.environmentService.api + '/ideas', JSON.stringify(idea), { headers: this.environmentService.headers })
      .subscribe(resp => {
        const si = this.getIdeaIndexByHash(idea);
        this.ideas[si] = resp as Idea;

        success();
      }, err => {
        error(err);
      });
  }

  updateIdea(idea: Idea, success: () => void = () => { }, error: (err: any) => void = () => { }) {
    this.http
      .put(this.environmentService.api + '/ideas/' + idea.id, JSON.stringify(idea), { headers: this.environmentService.headers })
      .subscribe(resp => {
        success();
      }, err => {
        error(err);
      });
  }

  deleteIdea(idea: Idea, success: () => void = () => { }, error: (err: any) => void = () => { }) {
    this.http
      .delete(this.environmentService.api + '/ideas/' + idea.id, { headers: this.environmentService.headers })
      .subscribe(resp => {
        const si = this.ideas.indexOf(this.ideas.filter(id => id.id === idea.id).shift());
        this.ideas.splice(si, 1);

        success();
      }, err => {
        error(err);
      });
  }

  getIdeas(page: number, success: (newIdeasLength: number) => void = () => { }, error: (err: any) => void = () => { }) {
    const httpParams = new HttpParams().set('page', page.toString());
    this.http
      .get(this.environmentService.api + '/ideas', { headers: this.environmentService.headers, params: httpParams })
      .map(resp => resp as Idea[])
      .subscribe(ideas => {
        this.ideas = this.ideas.concat(ideas);
        success(ideas.length);
      }, err => {
        error(err);
      });
  }

  getIdeaIndexByHash(idea: Idea) {
    return this.ideas.indexOf(this.ideas.filter(id => id.hash === idea.hash).shift());
  }

  clear() {
    this.ideas = [];
  }
}

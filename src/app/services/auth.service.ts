import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  user: User;
  refreshTokenTimerId;

  constructor(private http: HttpClient, private environmentService: EnvironmentService) { }

  signup(name: string, email: string, password: string, success: (user: User) => void, error: (err: any) => void): void {
    this.http
      .post(this.environmentService.api + '/users', { name, email, password }, { headers: this.environmentService.headers })
      .subscribe(resp => {
        this.setToken(resp);
        this.me(success, error);
      }, err => {
        error(err);
      });
  }

  login(email: string, password: string, success: (user: User) => void, error: (err: any) => void): void {
    this.http
      .post(this.environmentService.api + '/access-tokens', { email, password }, { headers: this.environmentService.headers })
      .subscribe(resp => {
        this.setToken(resp);
        this.me(success, error);
      }, err => {
        error(err);
      });
  }

  logout(success: () => void, error: (err: any) => void): void {
    const refresh_token = localStorage.getItem('refresh_token');
    this.http
      .request('delete', this.environmentService.api + '/access-tokens', { body: { refresh_token }, headers: this.environmentService.headers })
      .subscribe(resp => {
        success();
      }, err => {
        error(err);
      });
  }

  private refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    this.http
      .post(this.environmentService.api + '/access-tokens/refresh', { refresh_token }, { headers: this.environmentService.headers })
      .subscribe(resp => {
        this.setToken(resp);
      }, err => {
      });
  }

  me(success: (user: User) => void, error: (err: any) => void): void {
    this.http
      .get(this.environmentService.api + '/me', { headers: this.environmentService.headers })
      .subscribe(resp => {
        this.setUser(resp);
        success(this.user);
      }, err => {
        error(err);
      });
  }

  hasUser(): boolean {
    return this.user !== undefined;
  }

  clear() {
    clearTimeout(this.refreshTokenTimerId);
    this.user = undefined;
    localStorage.clear();
  }

  private setUser(data: any) {
    const { name, email, avatar_url } = data as User;
    this.user = new User(name, email, avatar_url);

    this.tokenUpdateTimer();
  }

  private setToken(token) {
    localStorage.setItem('jwt', token.jwt);
    if (token.refresh_token) {
      localStorage.setItem('refresh_token', token.refresh_token);
    }
    localStorage.setItem('refresh_token_time', new Date().getTime().toString());

    this.tokenUpdateTimer();
  }

  private tokenUpdateTimer() {
    const tokenExpirationTime = (10 - 0.2) * 60000;
    const now = new Date().getTime();
    const last = parseFloat(localStorage.getItem('refresh_token_time')) || now;
    const deltaTime = now - last;

    clearTimeout(this.refreshTokenTimerId);
    this.refreshTokenTimerId = setTimeout(() => this.refreshToken(), tokenExpirationTime - deltaTime);
  }
}

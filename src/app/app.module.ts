import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyIdeasComponent } from './components/my-ideas/my-ideas.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewIdeaComponent } from './components/my-ideas/new-idea/new-idea.component';
import { RemoveIdeaPopupComponent } from './components/popups/remove-idea-popup/remove-idea-popup.component';

import { AuthService } from './services/auth.service';
import { IdeaService } from './services/idea.service';
import { ValidationService } from './services/validation.service';
import { EnvironmentService } from './services/environment.service';
import { PopupService } from './services/popup.service';

import { AuthGuard } from './guards/auth.guard';
import { AutoFocusDirective } from './directives/auto-focus.directive';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent, canActivate: [AuthGuard] },
  { path: 'my-ideas', component: MyIdeasComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    MyIdeasComponent,
    NotFoundComponent,
    LeftBarComponent,
    NewIdeaComponent,
    RemoveIdeaPopupComponent,
    AutoFocusDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, IdeaService, ValidationService, EnvironmentService, PopupService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [RemoveIdeaPopupComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PuzzleService } from './puzzle.service';
import { TokenInterceptor } from './token.interceptor';

import { AppComponent } from './app.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { MessagesComponent } from './messages/messages.component';
import { PuzzleDetailComponent } from './puzzle-detail/puzzle-detail.component';
import { WordsComponent } from './words/words.component';
import { TimerComponent } from './timer/timer.component';
import { WordEntryComponent } from './word-entry/word-entry.component';
import { NewGameComponent } from './new-game/new-game.component';
import { LoginComponent } from './login/login.component';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { DiceComponent } from './dice/dice.component';
import { OptionsComponent } from './options/options.component';


const appRoutes: Routes =[
  { path: 'login', component: LoginComponent },
  { path: 'puzzles', component: PuzzleComponent },
  { path: 'play/:id', component: PuzzleDetailComponent },
  { path: 'newgame', component: NewGameComponent },
  { path: 'dice', component: DiceComponent },
  { path: 'options', component: OptionsComponent },
  { path: '**', component: LoginComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    MessagesComponent,
    PuzzleDetailComponent,
    WordsComponent,
    TimerComponent,
    WordEntryComponent,
    NewGameComponent,
    LoginComponent,
    TitlebarComponent,
    DiceComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

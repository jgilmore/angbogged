import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { MessagesComponent } from './messages/messages.component';
import { PuzzleDetailComponent } from './puzzle-detail/puzzle-detail.component';
import { WordsComponent } from './words/words.component';
import { TimerComponent } from './timer/timer.component';
import { WordEntryComponent } from './word-entry/word-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    MessagesComponent,
    PuzzleDetailComponent,
    WordsComponent,
    TimerComponent,
    WordEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

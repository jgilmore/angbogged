import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { MessagesComponent } from './messages/messages.component';
import { PuzzleDetailComponent } from './puzzle-detail/puzzle-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PuzzleComponent,
    MessagesComponent,
    PuzzleDetailComponent
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

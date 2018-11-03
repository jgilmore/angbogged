import { Component, OnInit, Input } from '@angular/core';
import { WordsService } from '../words.service';
import { MessageService } from '../message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-word-entry',
  templateUrl: './word-entry.component.html',
  styleUrls: ['./word-entry.component.css']
})
export class WordEntryComponent implements OnInit {
  @Input() play: number;
  @Input() duration: moment.Duration;
  entry: string;
  disabled;


  public sendWord() {
    /* Called when enter is pressed on the input form. Sends the word off 
     * to the backed for validation.
     */
    this.wordsService.addWord(this.entry, this.duration, this.play);
    this.entry=""
  }

  public checkEntry(){
    /* disallow non-alphabetical entries, and force uppercase
    */
    this.messageService.add("keyup event, entry=" + this.entry);
    var entry = ""
    for( var i = 0; i < this.entry.length; i++){
      var c = this.entry.slice(i,i+1).toLowerCase();
      if( "abcdefghijklmnopqrstuvwxyz".indexOf(c) !== -1){
        entry += c;
      }
    }
    this.entry=entry;
  }


  constructor(
    private wordsService: WordsService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

}

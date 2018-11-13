import { Component, OnInit, Input } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { MessageService } from '../message.service';
import { AddWord } from '../addword.service';
import * as moment from 'moment';

@Component({
  selector: 'app-word-entry',
  templateUrl: './word-entry.component.html',
  styleUrls: ['./word-entry.component.css']
})
export class WordEntryComponent implements OnInit {
  @Input() puzzle: number;
  @Input() duration: moment.Duration;
  entry: string;
  errormessage: string;
  disabled;


  public sendWord() {
    /* Called when enter is pressed on the input form. Sends the word off 
     * to the backed for validation, sets a message if it didn't work, and
     * emits an event to our siblings to add the new word to the list immediately.
     */
    var word = this.entry; // For the closure.
    if(this.entry.length > 2){
      this.puzzleService.addWord(this.entry, this.duration, this.puzzle)
        .subscribe( result =>{
          this.addWord.add(word);
          this.messageService.add("Posted " + word + " result returned:"+result);
          this.errormessage = "";
        }, ( error: any ) =>{
          if( error.status !== 409 ){
            this.messageService.add("HTTP POST failed, status=" 
              + error.status + " result returned:"
              + error.error );
          } else{
            var message: string;
            message = error.error + ""; //Force to string.
            // Easy: display this error message.
            if( message.includes("valid")){
              this.errormessage = "That's not a word I know!";
            } else if( message.includes("nique")){
              this.errormessage = "Found it already, dofus!";
            } else {
              this.errormessage = message;
            }
          }
        });
    }
    this.entry=""
  }

  public checkEntry(){
    /* disallow non-alphabetical entries, and force lowercase
    */
    this.messageService.add("keyup event, entry=" + this.entry);
    var entry = ""
    for( var i = 0; i < this.entry.length; i++){
      var c = this.entry.slice(i,i+1).toLowerCase();
      if( "abcdefghijklmnopqrstuvwxyz".includes(c)){
        entry += c;
      }
    }
    this.entry=entry;
  }


  constructor(
    private puzzleService: PuzzleService,
    private messageService: MessageService,
    private addWord: AddWord,
  ) { }

  ngOnInit() {
    this.errormessage = "";
  }

}

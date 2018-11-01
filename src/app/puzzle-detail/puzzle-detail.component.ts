import { Component, OnInit } from '@angular/core';
import { Puzzle, PuzzleOptions } from '../puzzle';
import { MessageService } from '../message.service';

class pbutton {
  text: string;
  "class": string[];
}

@Component({
  selector: 'app-puzzle-detail',
  templateUrl: './puzzle-detail.component.html',
  styleUrls: ['./puzzle-detail.component.css']
})
export class PuzzleDetailComponent implements OnInit {
  entry: string;
  buttons: pbutton[][];
  cssclasses=[
    'puzzlebutton1',
    'puzzlebutton2',
    'puzzlebutton3',
    'puzzlebutton4',
  ]
  puzzle: Puzzle ={
    "id": 10,
    "options": [
      {
        "id": 2,
        "date": new Date("2018-10-18T22:13:48.603248Z"),
        "complete": false,
        "score": 0,
        "time": "00:05:00",
        "missed": false,
        "repeats": false,
        "showmaximum": false,
        "minimumwordlength": 3,
        "handicap": 1.0
      }
    ],
    "createdby": "Juan Cortez",
    "layout": "ABCDEFGHIJKLMNOPQRSTUVWXY",
    "diceset": "1"
  }

  public sendWord() {
    /* Called when enter is pressed on the input form. Sends the word off 
     * to the backed for validation.
     */
    this.messageService.add(`puzzle-detail: submitted word ${this.entry}`)
    console.log("blah!")
    this.entry=""
  }

  public checkEntry(){
    /* disallow non-alphabetical entries, and force uppercase
    */
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
    private messageService: MessageService,
  ){
  }

  private hashCode(str: string) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };


  ngOnInit() {

    var size = Math.sqrt(this.puzzle.layout.length)

    this.buttons=[]
    for( var i=0; i<size; i++){
      this.buttons.push([])
      for( var j=0; j<size; j++){
        var button = new pbutton();
        button.text = this.puzzle.layout.slice(i*size+j,i*size+j+1);
        button.class=[
          this.cssclasses[
            Math.abs(this.hashCode(this.puzzle.layout+button.text)+i*j)
            % this.cssclasses.length]
        ]
        if( button.text === 'Q' ){
          button.text = 'Qu';
          button.class.push('qubutton');
        }
        else{
          button.class.push('puzzlebutton');
        }
        this.buttons[i].push(button);
      }
    }
  }

}


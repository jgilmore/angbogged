import { Component, OnInit } from '@angular/core';
import { Puzzle, PuzzleOptions } from '../puzzle';
import { MessageService } from '../message.service';
import { PuzzleService } from '../puzzle.service';
import * as moment from 'moment';

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
  counter: moment.Duration;
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
        "time": moment.duration("00:06:00"),
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

  constructor(
    private messageService: MessageService,
    private puzzleService: PuzzleService,
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

  private updateButtons(){
    /* This updates button array with the values from the layout string.
     * Also updates the button array with the correct CSS class information,
     * assuring that the text sizes are right for 'Qu' and the background
     * images change between puzzles while remaining consisten for any given
     * puzzle.
     */
    var size = Math.sqrt(this.puzzle.layout.length);
    this.messageService.add("updating buttons to layout:" 
      + this.puzzle.layout 
      + " of length " 
      + this.puzzle.layout.length);

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

  counterTick(counter: moment.Duration){
    this.counter = counter;
  }


  ngOnInit() {
    // This is going to operate from the "blank" data on the initialization.
    // We'll call this again once we get a copy of the actual layout.
    this.updateButtons();
    this.puzzleService.getPuzzle(9).subscribe(
      puzzle => {
        this.puzzle = puzzle;
        this.updateButtons();
      });

  }

}


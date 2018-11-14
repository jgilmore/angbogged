import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { PuzzleService } from '../puzzle.service';
import { Router } from '@angular/router';
import { PuzzleOptions } from '../puzzle';
import * as moment from 'moment';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() id: number; // This is the diceset ID to use when creating the game...
  time: string= "5:00";

  options = {
    "id": null,
    "date": null,
    "complete": false,
    "score": 0,
    "time": null,
    "missed": false,
    "repeats": false,
    "showmaximum": true,
    "minimumwordlength": 3,
    "handicap": 1.0,
  };
  create(){
    // Create the game
    if(this.options.minimumwordlength < 3){
      this.options.minimumwordlength = 3;
    }
    //TODO: try/catch here with message to user for malformatted time string.
    this.options.time = moment.duration(this.time);
    this.messageService.add("creating new game"+this.id+ " with options " + this.options);
    return this.puzzleService.newGame(this.options,this.id);
  }
  onCreate(){
    // Create game and navigate to game list
    this.create().subscribe( result =>{
      // TODO: Test for success here before doing this.
      this.router.navigate(['/puzzles']);
    });
  }
  onCreateAndPlay(){
    // Create game and navigate to playing the game.
    this.create().subscribe( result =>{
      this.router.navigate([`/play/${this.id}`]);
    });
  }

  constructor(
    private messageService: MessageService,
    private puzzleService: PuzzleService,
    private router: Router,
  ){
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { PuzzleService } from '../puzzle.service';

interface diceset{
  description: string;
  dice: string;
  id: number;
  active: boolean;
}


@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  /* List of dice sets. Open up a sub-list under it when clicked to adjust options.
   * Then press a button to create the game, or a different button to create the game
   * and start playing.
   */
  dice: diceset[];

  getDice(){
    this.puzzleService.getDice().subscribe( dice =>{
      this.dice = dice;
      this.messageService.add("got dice, " + dice.length);
    });
  }
  activate(id:number){
    var i = 0;
    for( i = 0 ; i < this.dice.length ; i ++ ){
      this.dice[i].active = this.dice[i].id == id;
    }
  }

  constructor(
    private messageService: MessageService,
    private puzzleService: PuzzleService,
  ){
  }

  ngOnInit() {
    this.dice = [];
    this.getDice();
  }

}

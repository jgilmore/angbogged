import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { WordsListSet, Players, PuzzleService } from '../puzzle.service';
import { PuzzleOptions } from '../puzzle';
import { MessageService } from '../message.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddWord } from '../addword.service';


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  @Input() options: PuzzleOptions;
  @Input() puzzle: number;
  @Output() score: number;
  words: WordsListSet[];
  misses: number;
  oldpuzzle: number;
  private ngUnsubscribe = new Subject();

  private getWords(){
    var subscription;
    this.oldpuzzle = this.puzzle;
    this.messageService.add(`Words: Subscribed, puzzle=${this.puzzle}`);
    subscription = this.puzzleService.pollWords(this.puzzle).pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe( words =>{
      this.words = words;
      if (this.oldpuzzle != this.puzzle){
        // puzzle has changed. Seppuku is the only answer.
        subscription.unsubscribe();
        this.getWords(); // Is this call recursive? Sort of yes, Sort of No.
        return;
      }
      this.updateScore();
    });
  }

  private updateScore(){
    /* Updating the score has several steps:
     *  1. cycle through the words found, adding word.length - options.minwordlength to the score.
     *  2. Subtract the count of "null" words (misses and repeats)
     *  3. Basic score=done
     *  4. For multiplayer score, we add up who got it FIRST only. So basically the above,
     *     but for each word, check to see if someone else got it first.
     */
    this.misses = 0;
    this.score = 0;
    for( var i = 0; i < this.words.length ; i++){
      this.words[i].playerlist = ""
      if( this.words[i].word === null ){
        this.misses ++;
        this.score  --;
      }
      else{
        this.score += this.words[i].word.length - this.options.minimumwordlength;
      }
      for( var j = 0; j < this.words[i].players.length ; j++){
        this.words[i].playerlist += this.words[i].players[j].player + ' ';
      }
    }
  }



  constructor(
    private puzzleService: PuzzleService,
    private messageService: MessageService,
    private addWord: AddWord,
  ) { }

  ngOnInit() {
    this.words = [];
    this.misses = 0;
    this.getWords();
    this.messageService.add("listener:"+this.addWord.listen);
    this.addWord.listen.pipe(
      takeUntil(this.ngUnsubscribe),
    ).subscribe( word =>{
      // TODO: Add the word in alphabetical order, with a "newword" CSS class.
      var i: number;
      var newword: WordsListSet;
      this.messageService.add("Words: Recieved word: " + word);
      for(i = 0 ; i < this.words.length ; i++){
        if( this.words[i].word > word ){
          break;
        }
      }
      newword={
        "word":word,
        "foundtime": null,
        "players": [],
        "playerlist":"",
      }
      if( i < this.words.length ){
        this.words.splice(i,0,newword);
      } else {
          this.words.push(newword);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

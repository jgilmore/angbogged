import { Component, OnInit, Input } from '@angular/core';
import { WordsListSet, Players, PuzzleService } from '../puzzle.service';
import { PuzzleOptions } from '../puzzle';


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  @Input() options: PuzzleOptions;
  words: WordsListSet[];

  private getWords(){
    this.puzzleService.pollWords(1).subscribe( words => this.words = words);
  }


  constructor(
    private puzzleService: PuzzleService,
  ) { }


  ngOnInit() {
    this.words = [];
    this.getWords();
  }

}

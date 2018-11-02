import { Component, OnInit } from '@angular/core';
import { WordsListSet, Players, WordsService } from '../words.service';


@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
  words: WordsListSet[];

  private getWords(){
    this.wordsService.pollWords(1).subscribe( words => this.words = words);
  }


  constructor(
    private wordsService: WordsService,
  ) { }


  ngOnInit() {
    this.words = [];
    this.getWords();
  }

}
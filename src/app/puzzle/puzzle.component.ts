import { Component, OnInit } from '@angular/core';
import { Puzzle } from '../puzzle';
import { Observable } from 'rxjs';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  puzzles: Puzzle[];

  private getPuzzles() {
    this.puzzleService.getPuzzles().subscribe( puzzles => this.puzzles = puzzles );
  }

  constructor(
    private puzzleService: PuzzleService
  ) { }

  ngOnInit() {
    this.getPuzzles();
  }

}

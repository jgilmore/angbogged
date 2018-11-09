import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
  showLogin():boolean{
    return !this.puzzleService.isAuthenticated();
  }

  constructor(
    private puzzleService: PuzzleService,
  ) { }

  ngOnInit() {
  }

}

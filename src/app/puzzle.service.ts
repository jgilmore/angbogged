"use strict";
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of }  from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Puzzle, PuzzleOptions } from './puzzle';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class PuzzleService {

  public getPuzzles(): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(this.puzzleURL + this.formatURL)
      .pipe(
        catchError(this.handleError('getPuzzles', [])),
        map(this.parsedates),
        tap(this.successMessage())
      );
  }
  public getPuzzle(puzzleID: number): Observable<Puzzle> {
    return this.http.get<Puzzle>(this.puzzleURL + puzzleID + this.formatURL)
      .pipe(
        catchError(this.handleError('getPuzzles', [])),
        map(this.parsedates),
        tap(this.successMessage())
      );
  }
  private puzzleURL = "http://127.0.0.1:8000/puzzle/";
  private formatURL = "?format=json";

  private parsedates(puzzles: Puzzle[], index:number ){
    for( var i=0, puzzle; puzzle = puzzles[i] ; i++){
      puzzle.options[0].date = moment(puzzle.options[0].date).fromNow();
      puzzle.options[0].time = moment.duration(puzzle.options[0].time).humanize();
    }
    return puzzles
  }

  private handleError<T>(operation:string = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      this.doMessage(operation + ` failed! ${error.message}`)
      return of(result as T);
    }
  }

  private successMessage(){
    return that => {
      this.doMessage(`Puzzles Retrieved:${that.length}!`)
    }
  }

  private doMessage(message: string){
    this.messageService.add(`PuzzleService:${message}`);
    return;
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }
}

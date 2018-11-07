import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of, interval }  from 'rxjs';
import { catchError, map, tap, pluck } from 'rxjs/operators';
import { Puzzle, PuzzleOptions } from './puzzle';
import * as moment from 'moment';


export class Players{
  player: string;
  foundtime: string;
  //pk: number;
}


export class WordsListSet {
  //id: number;
  word: string;
  foundtime: string;
  players: Players[];
  playerlist: string;
}


class WordsResponse {
  wordlist_set: WordsListSet[];
  //pk: number;
}


class WordsPostFormat {
  puzzle: number;
  word: string;
  foundtime: moment.Duration;
}


@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private server = "http://127.0.0.1:8000";
  private getWordsURL = this.server + '/wordlist/'; 
  private addWordURL = this.server + '/word/'; 
  private puzzleURL = this.server + '/puzzle/';
  private loginURL = this.server + '/login/';
  private formatURL = '?format=json';
  private token: string;

  // Login function
  private LoginIfNeeded(){
  }

  // Word fetching functions 
  public addWord(word: string, interval: moment.Duration, puzzle: number){ 
 
    var sendMe = new WordsPostFormat(); 
 
    sendMe.puzzle = puzzle; 
    sendMe.word = word; 
    sendMe.foundtime = interval; 
 
    this.doMessage(`Adding: ${ word } with interval:${ interval.asSeconds() } and puzzle: ${ puzzle }`) 
    return this.http.post<WordsResponse[]>(this.addWordURL,  sendMe) 
      .pipe( 
        catchError(this.handleError('getWords', [])), 
        tap(this.successMessage('addWord')), 
      ); 
  } 
 
  public pollWords(puzzle: number): Observable<WordsListSet[]> { 
    var observable = this.http.get<WordsListSet[]>(this.getWordsURL + puzzle + this.formatURL) 
      .pipe( 
        catchError(this.handleError('getWords',[])), 
        pluck('wordlist_set'), 
        map(this.changetoplayerstring), 
        tap(this.successMessage('getWords')), 
      );
    return observable;
  } 

  private changetoplayerstring(words: WordsListSet[]){ 
    for( var i = 0; i < words.length ; i++){ 
      words[i].playerlist = "" 
      for( var j = 0; j < words[i].players.length ; j++){ 
        words[i].playerlist += words[i].players[j].player + ' '; 
      } 
    } 
    return words; 
  } 

  // Puzzle fetching functions
  public getPuzzles(): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(this.puzzleURL + this.formatURL)
      .pipe(
        catchError(this.handleError('getPuzzles', [])),
        map(this.parsedates),
        tap(this.successMessage('getPuzzles'))
      );
  }

  public getPuzzle(puzzleID: number): Observable<Puzzle> {
    return this.http.get<Puzzle>(this.puzzleURL + puzzleID + this.formatURL)
      .pipe(
        catchError(this.handleError('getPuzzle', [])),
        map(this.parsedates),
        tap(this.successMessage('getPuzzle'))
      );
  }

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

  private successMessage(from: string){
    return that => {
      this.doMessage(`Success: ${from}:${that.length}!`)
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

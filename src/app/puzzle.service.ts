import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of, interval }  from 'rxjs';
import { catchError, map, tap, pluck, switchMap } from 'rxjs/operators';
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


@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private server = "http://127.0.0.1:8000";
  private getWordsURL = this.server + '/wordlist/'; 
  private addWordURL = this.server + '/word/'; 
  private puzzleURL = this.server + '/puzzle';
  private authURL = this.server + '/auth/';
  private formatURL = '/?format=json';
  public token: string;

  // Login functions
  // auth API access points:
  //   login, logout, 
  //   "password/reset", "password/reset/confirm", "password/change", 
  //   verify-email, account-confirm-email, 
  //   /,  (registration)
  //   user (for updating user details)
  public isAuthenticated(){
    // if token is "truthy" assume we're authenticated.
    return !!this.token;
  }

  public login(emailorname: string, password:string): Observable<boolean>{
    var name, email;
    if( emailorname.includes('@') ){
      email = emailorname;
    }
    else{
      name = emailorname;
    }
    return this.http.post(this.authURL + 'login/', {
      "username": name,
      "email": email,
      "password": password,
    }).pipe(
      catchError(this.handleError('login',{"key":false})),
      map( (response:{"key":string}) =>{ 
        this.token = response.key;
        localStorage.setItem("token",this.token);
        this.doMessage("Login finished, got key " + this.token);
        return !!this.token;
      } )
    )
  }
  
  public logout(){
    this.http.post(this.authURL + 'logout',{}).subscribe( anything => this.token = undefined )
  }

  public register(username: string, email:string, pword1: string, pword2: string ){
    this.doMessage("register function is unimplemented in puzzleservice");
  }

  // Word fetching functions 
  public addWord(word: string, interval: moment.Duration, puzzle: number){ 
    this.doMessage(`Adding: ${ word } with interval:${ interval.asSeconds() } and puzzle: ${ puzzle }`) 
    return this.http.post(this.addWordURL,
      {
        "puzzle":puzzle,
        "word":word,
        "foundtime":`00:00:${interval.asSeconds()}`,
      }) 
      .pipe( 
        catchError(this.handleError('getWords', [])), 
        tap(this.successMessage('addWord')), 
      ); 
  } 
 
  public pollWords(puzzle: number): Observable<WordsListSet[]> { 
    var observable = interval(5000).pipe(
      switchMap( dumpme => {
        return this.http.get(this.getWordsURL + puzzle + this.formatURL) 
          .pipe( 
            catchError(this.handleError('getWords',[])), 
            pluck('wordlist_set'), 
            map(this.changetoplayerstring), 
            tap(this.successMessage('getWords')), 
          );
      })
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
    return this.http.get<Puzzle>(this.puzzleURL + '/' + puzzleID + this.formatURL)
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

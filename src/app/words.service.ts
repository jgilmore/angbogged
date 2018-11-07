import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of }  from 'rxjs';
import { catchError, map, tap, pluck } from 'rxjs/operators';
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
export class WordsService {
  private getWordsURL = 'http://127.0.0.1:8000/wordlist/';
  private addWordURL = 'http://127.0.0.1:8000/word/';

  public addWord(word: string, interval: moment.Duration, puzzle: number){

    var sendMe = new WordsPostFormat();

    sendMe.puzzle = puzzle;
    sendMe.word = word;
    sendMe.foundtime = interval;

    this.doMessage(`Adding: ${word} with interval:${interval.asSeconds()} and puzzle: ${puzzle}`)
    return this.http.post<WordsResponse[]>(this.addWordURL,  sendMe)
      .pipe(
        catchError(this.handleError('getWords', [])),
        tap(this.successMessage('addWord')),
      );
  }

  /* TODO: Make this actually poll instead of just doing one "get" and stopping */
  public pollWords(play: number): Observable<WordsListSet[]> {
    return this.http.get<WordsListSet[]>(this.getWordsURL+play+'/?format=json')
      .pipe(
        catchError(this.handleError('getWords',[])),
        pluck('wordlist_set'),
        map(this.changetoplayerstring),
        tap(this.successMessage('getWords')),
      );
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

  private handleError<T>(operation:string = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      this.doMessage(operation + ` failed! ${error.message}`)
      return of(result as T);
    }
  }

  private successMessage(what: string){
    return that => {
      if( that.length < 2){
        this.doMessage(`Words ${what} :${that}`)
      }
      else{
        this.doMessage(`Words ${what} :${that.length}`)
      }
    }
  }

  private doMessage(message: string){
    this.messageService.add(`WordsService:${message}`);
    return;
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

}

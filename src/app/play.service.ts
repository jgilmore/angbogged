import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of }  from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Puzzle, PuzzleOptions } from './puzzle';
import { MessageService } from './message.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class PlayService {


  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

}

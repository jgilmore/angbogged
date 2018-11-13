import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AddWord {
  listen: Subject<string> = new Subject();
  public add(word:string){
    this.listen.next(word);
    this.messageService.add("AddWord: Sent word: " + word);
  }

  constructor(
    private messageService: MessageService,
  ){
  }
}

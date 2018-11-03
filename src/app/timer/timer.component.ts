import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable, timer, pipe, interval } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer: Observable<number>;
  @Input() initialTime: moment.Duration;
  private oldInitialTime: moment.Duration;
  @Output() updateCounter: EventEmitter<moment.Duration> = new EventEmitter();
  counter: moment.Duration;
  minutes: number;
  seconds: number;
  // TODO: set the css class of the timer display to red once we're less than 30s,
  // and to blink if less than 10s.

  constructor() { }

  ngOnInit() {
    //count one second intervals

    this.timer = interval(1000);
    this.counter= this.initialTime.clone();
    // Note that we only updat the counter ONCE. This is because we're handing off a referance
    // to a shared counter object. We could preserve the illusion that's not what we're actually doing.
    // Or we could not do that, but it would involve copying and emiting a new duration object each 
    // second, which seems kinda silly. Just don't modify it in the overarching puzzle-detail component?
    this.updateCounter.emit(this.counter);

    this.timer.subscribe( val => {
      this.counter.add(-1,'seconds');
      // FIXME: This doesn't work for durations longer than 59 minutes. I'd use the "asMinutes"
      // method, but it rounds UP if seconds > 30. The "right" way to do this may be to subtract 
      // 30 seconds, take the "asMinutes" value and then add the seconds back. But that sounds
      // stupid, and this is good enough for now.
      this.minutes = this.counter.minutes();
      this.seconds = this.counter.seconds();
    });
  }

}

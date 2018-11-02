import { Component, OnInit } from '@angular/core';
import { Observable, timer, pipe, interval } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  timer: Observable<number>;
  initialTime: number;
  counter: moment.Duration;
  minutes: number;
  seconds: number;

  constructor() { }

  ngOnInit() {
    //count one second intervals

    this.timer = interval(1000);
    this.initialTime = 300;
    this.counter=moment.duration(this.initialTime,'seconds');
    this.minutes = (this.initialTime/60) | 0;
    this.seconds = (this.initialTime%60)

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

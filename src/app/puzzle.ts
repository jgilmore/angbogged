import * as moment from 'moment';
export class PuzzleOptions {
  id: number;
  date: Date;
  complete: boolean;
  score: number;
  time: moment.Duration;
  missed: boolean;
  repeats: boolean;
  showmaximum: boolean;
  minimumwordlength: number;
  handicap: number;

}

export class Puzzle {
  id: number;
  options: PuzzleOptions[];
  diceset: string;
  createdby: string;
  layout: string;
}


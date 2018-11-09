import { Component, OnInit } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nameoremail: string;
  password: string;
  loading: boolean;
  message: string;

  onSubmit(){
    var killme = this.puzzleService.login(this.nameoremail, this.password).subscribe( success =>{
      if(success){
        this.router.navigate(['/puzzles']);
      }
      else{
        this.message="Login failed. Please try again.";
      }
      this.loading=false;
      killme.unsubscribe();
      this.messageService.add("killed him.");
    });
    this.loading=true;
  }

  constructor(
    private puzzleService: PuzzleService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.message = "messages go here?";
    this.nameoremail = "";
    this.password = "";
  }

}

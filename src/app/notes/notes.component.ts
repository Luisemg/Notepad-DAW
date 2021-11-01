import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  msg: string = '';
  author: string = 'Anonimo';
  messages: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addMessage() {
    this.messages.push(this.msg);
    this.msg = '';
  }

}

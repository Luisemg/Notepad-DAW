import { Component, OnInit } from '@angular/core';
import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';

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

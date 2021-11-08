import { Component, OnInit } from '@angular/core';
import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: string = '';
  name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getToken() {
    this.token = '';
    this.name = '';
  }

}

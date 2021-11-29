import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';
import { DataService } from '../data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  email: string = '';
  user: string = '';
  pass: string = '';
  token: string = '';

  subscription: Subscription = new Subscription;

  subscriptionUser: Subscription = new Subscription;

  notes: Array<any> = [];

  loading: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  private querySubscription: Subscription = new Subscription();  

  constructor(private _data: DataService,
              private graphqlProductsService: GraphqlProductsService,
              private graphqlUsersService : GraphqlUsersService) { }

  ngOnInit() {
    this.querySubscription = this.graphqlProductsService.notes("-")
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = JSON.parse(JSON.stringify(data)).notes;
        console.log(JSON.stringify(this.notes))
      });   
    this.subscription= this._data.currentToken.subscribe(token => this.token = token); 
    this.subscriptionUser= this._data.currentUser.subscribe(user => this.user = user); 
  }

  alertUser() {

    alert(this.user + " - " + this.pass + " Enter your credentials again to get the TOKEN");
    this.graphqlUsersService.createUser(this.user,this.email,this.pass )
    .subscribe(({ data }) => {
       console.log('User created :  ', data);
    }, (error) => {
       console.log('there was an error sending the query', error);
    });
    this.refresh()
} 

  refresh(): void {
    window.location.reload();
  }

  loginUser() {

    alert(this.user + " - " + this.pass);
    this.graphqlUsersService.tokenAuth(this.user, this.pass)
    .subscribe(({ data }) => {
      console.log('User created: ', JSON.stringify(data));
      this.token =  JSON.parse(JSON.stringify(data)).tokenAuth.token;
    }, (error) => {
       console.log('there was an error sending the query', error);
    });
    this.subscription= this._data.currentToken.subscribe(token => this.token = token); 
    this.subscriptionUser= this._data.currentUser.subscribe(user => this.user = user); 
  } 

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.subscriptionUser.unsubscribe();
  }
}

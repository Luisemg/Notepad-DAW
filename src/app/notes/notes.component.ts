import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GraphqlProductsService} from '../graphql.products.service';
import { Subscription } from 'rxjs';
import { GraphqlUsersService} from '../graphql.users.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {

  note: string = '';
  token: string = '';
  user: string='';

  subscription:Subscription=new Subscription();
  subscriptionUser:Subscription=new Subscription();

  loading: boolean = false;
  private querySubscription: Subscription = new Subscription();  

  notes: Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router, private data: DataService,
              private graphqlProductsService: GraphqlProductsService) {
    // this.route.params.subscribe( res => console.log(res.id)); 
  }

  ngOnInit() {
    this.querySubscription = this.graphqlProductsService.notes("-")
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.notes = JSON.parse(JSON.stringify(data)).notes;
        console.log(JSON.stringify(this.notes))
      });  
    this.subscription=this.data.currentToken.subscribe(token => this.token = JSON.parse(JSON.stringify(token)).subscription);
    this.subscriptionUser=this.data.currentUser.subscribe(user => this.user = JSON.parse(JSON.stringify(user)).subscriptionUser);
    console.log(JSON.stringify(this.token));
    console.log(JSON.stringify(this.user));
  }

  addMessage() {
    //var mytoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Implc3VzIiwiZXhwIjoxNjM4MTQ1NTQ1LCJvcmlnSWF0IjoxNjM4MTQ1MjQ1fQ.9bG66OGunwDiu-ZT1NB-6Lb2VXiTjtf19hE-Fcg4tMM";
    
    alert(this.note);

    this.graphqlProductsService.createNote(this.token, this.user, this.note)
    .subscribe(({ data }) => {
       console.log('Note created :  ', data);
    }, (error) => {
       console.log('there was an error sending the query', error);
    });

    this.note = '';
    this.data.changeNote(this.notes);
    this.refresh()
  } 

    refresh(): void {
      window.location.reload();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.subscriptionUser.unsubscribe();
    }
}

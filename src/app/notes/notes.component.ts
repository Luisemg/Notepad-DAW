import { Component, OnInit } from '@angular/core';
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
export class NotesComponent implements OnInit {

  note: string = '';

  loading: boolean = false;
  private querySubscription: Subscription = new Subscription();  

  notes: Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService,
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
  }

  addMessage() {
    var mytoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ikx1aXNFIiwiZXhwIjoxNjM2MzgzMjc3LCJvcmlnSWF0IjoxNjM2MzgyOTc3fQ.8BzjddgxDkl9waVDN2s2ikiAbxhR-2HGUoU2iq0kDr8";
    
    alert(this.note);

    this.graphqlProductsService.createNote(mytoken, "LuisE", this.note)
    .subscribe(({ data }) => {
       console.log('Note created :  ', data);
    }, (error) => {
       console.log('there was an error sending the query', error);
    });

    this.note = '';
    this._data.changeNote(this.notes);
  }

}

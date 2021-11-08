import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Subscription } from 'rxjs';
//import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
//import { StorageService } from "./storage.service";

const TOKENAUTH = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

const NOTES = gql`
  query Notes {
    notes {
      user
      description
    }
  }
`;

const NOTESPARAM = gql`
  query NOTES($nombre: String!) {
    notes(nombre: $nombre) {
      id
      user
      description
    }
  }
`;
const CREATENOTE = gql`
  mutation CreateNote($user: String!, $description: String!) {
    createLink(user: $user, description: $description) {
      id
      user
      description
   }
  }
  `;

@Injectable({
  providedIn: 'root'
})

export class GraphqlProductsService  {

    loading: boolean = true;
    posts: any;
    private querySubscription: Subscription = new Subscription;

  constructor(private apollo: Apollo) {}

  notes(valor : string) {
    //alert(valor);
    if (valor=="-")
    {
      return this.apollo.watchQuery({
        query: NOTES 
      });
    }
    else
    {
      //alert(valor);
      return this.apollo.watchQuery({
        query: NOTESPARAM,
        variables: {
          nombre: valor
        }, 
      });
    }
  
  }
 
 createNote(mytoken: string, user: string, description: string) {
      console.log("token auth = " + mytoken);
      return this.apollo.mutate({
        mutation: CREATENOTE,
        variables: {
          user: user,
          description: description
        },
        context: {
          // example of setting the headers with context per operation
          headers: new HttpHeaders().set('Authorization', 'JWT ' + mytoken),
        },

      });
    
  }
   
}
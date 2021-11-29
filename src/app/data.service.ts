import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private notes = new BehaviorSubject<any>(['', '']);
  note = this.notes.asObservable();

  private tokenSource = new BehaviorSubject('');
  currentToken = this.tokenSource.asObservable();

  private userSource = new BehaviorSubject('');
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeNote(note: any){
    this.notes.next(note);
  }

  changeMessage(token: string){
    this.tokenSource.next(token);
  }

  changeUser(user: string){
    this.userSource.next(user);
  }
}

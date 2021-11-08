import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private notes = new BehaviorSubject<any>(['', '']);
  note = this.notes.asObservable();

  constructor() { }

  changeNote(note: any){
    this.notes.next(note);
  }
}

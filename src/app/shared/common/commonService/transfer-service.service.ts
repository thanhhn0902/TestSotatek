import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private subject = new Subject<any>();
  constructor() { }

  sendData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next(null);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskSotatekEntity } from '../schema/task-sotatek';

@Injectable({
  providedIn: 'root'
})
export class TaskSotatekService {

  dataDemo: TaskSotatekEntity[] = [
    {
      id: new Date().getTime().toString() + 1,
      title: 'Do homework',
      description: 'Lorem Ipsum....',
      dueDate: new Date(),
      piority: '0',
      isChecked: false,
      isSelected: false
    },
    {
      id: new Date().getTime().toString() + 2,
      title: 'Do homework1',
      description: 'Lorem Ipsum....',
      dueDate: new Date(),
      piority: '1',
      isChecked: false,
      isSelected: false
    },
    {
      id: new Date().getTime().toString() + 3,
      title: 'Do homework2',
      description: 'Lorem Ipsum....',
      dueDate: new Date(),
      piority: '2',
      isChecked: false,
      isSelected: false
    }
  ];

  constructor() { }

  getLocalStorage = (nameLS: string): Observable<any> => {
    let data = localStorage.getItem(nameLS) ?? '';
    if (data) {
      return new Observable((subscriber) => subscriber.next(JSON.parse(data.toString())));
    }
    return new Observable((subscriber) => subscriber.next(this.dataDemo));
  }

  setLocalStorage = (nameLS: string, data: any[]) => {
    if (data.length > 0) {
      // demo
      localStorage.removeItem(nameLS);
      localStorage.setItem(nameLS, JSON.stringify(data));
    }
  }
}

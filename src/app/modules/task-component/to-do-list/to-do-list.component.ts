import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { KEY_CODE, listPiority, localStorageData } from 'src/app/core/constants/task-const';
import { TaskSotatekEntity } from 'src/app/data/schema/task-sotatek';
import { TaskSotatekService } from 'src/app/data/service/tasksotatek.service';
import { commonFunc } from 'src/app/shared/common/commonFunc';
import { TransferService } from 'src/app/shared/common/commonService/transfer-service.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  @Input() lstData: TaskSotatekEntity[] = [];
  @Output() lstDataEmit: EventEmitter<any> = new EventEmitter();
  public selectedItem: any;
  public dateFormated: any;
  public keySearch?: any;
  public lsttPiority = listPiority;
  constructor(
    private service: TaskSotatekService,
  ) { }

  ngOnInit(): void {
    if (!this.lstData) {
      this.loadData();
    }
  }

  loadData = () => {
    this.service.getLocalStorage(localStorageData).subscribe(res => {
      if (res && res.length > 0) {
        this.lstData = res;
      } else {
        this.service.setLocalStorage(localStorageData, []);
      }
    });
  }

  onSelectedItem = (e: TaskSotatekEntity) => {
    this.resetSelected();
    let item = this.lstData.find(x => x.id === e.id);
    if (item) {
      item.isSelected = true;
      this.selectedItem = { ...item }
      this.dateFormated = commonFunc.formatDateTime(this.selectedItem.dueDate) ?? '';
      this.onSubmit();
    }
  }

  searhData = () => {
    let lst = this.lstData;
    if (this.keySearch) {
      this.lstData = lst.filter(x => x.title.toLowerCase().includes(this.keySearch.toLowerCase()));
    } else {
      this.loadData();
    }
  }

  onDelete = (e: any) => {
    if (e) {
      this.lstData = this.lstData.filter(x => x.id !== e.id);
      this.service.setLocalStorage(localStorageData, this.lstData);
      this.loadData();
      this.clearForm();
    }
  }

  resetSelected = () => {
    this.lstData.forEach(x => x.isSelected = false);
  }

  onSubmit = () => {
    this.lstData.forEach(x => {
      if (x.id === this.selectedItem.id) {
        x.title = this.selectedItem.title;
        x.description = this.selectedItem.description;
        x.dueDate = this.selectedItem.dueDate;
        x.isChecked = this.selectedItem.isChecked;
        x.piority = this.selectedItem.piority;
        x.isSelected = false;
      }
    });
    this.service.setLocalStorage(localStorageData, this.lstData);
    this.clearForm();
  }

  clearForm = () => {
    this.selectedItem = null;
  }

  onChangeItem = (e: any) => {
    let item = this.lstData.find(x => x.id === e.id);
    if (item) {
      item = e;
      this.lstDataEmit.emit(this.lstData);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ([KEY_CODE.BACK_SPACE, KEY_CODE.ENTER].indexOf(event.keyCode) > -1) {
      if (this.lstData.length === 0) {
        this.loadData();
        this.searhData();
      }
    }
  }
}
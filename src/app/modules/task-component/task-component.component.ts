import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { localStorageData } from 'src/app/core/constants/task-const';
import { TaskSotatekEntity } from 'src/app/data/schema/task-sotatek';
import { TaskSotatekService } from 'src/app/data/service/tasksotatek.service';
import { ComfirmDialogComponent } from 'src/app/shared/common/comfirm-dialog/comfirm-dialog.component';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.scss']
})
export class TaskComponentComponent implements OnInit {
  data: TaskSotatekEntity[] = [];
  constructor(
    private service: TaskSotatekService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData = () => {
    this.data = [];
    this.service.getLocalStorage(localStorageData).subscribe(res => {
      if (res) {
        this.data = res;
      }
    });
  }

  onEmitCreate = (e: any) => {
    if (!e.id) {
      e.id = e.id ?? new Date().getTime().toString();
      this.data.push(e);
      this.service.setLocalStorage(localStorageData, this.data);
      this.toastr.success('Save success!');
    }
  }

  onCheckItem = () => {
    return this.data.findIndex(x => x.isChecked) > -1;
  }

  onChangeData = (e: any) => {
    this.data = e;
  }

  onClickRemoveAll = () => {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data = this.data.filter(x => !x.isChecked);
        this.service.setLocalStorage(localStorageData, this.data);
        this.toastr.success('Save success!');
      }
    });

  }
}

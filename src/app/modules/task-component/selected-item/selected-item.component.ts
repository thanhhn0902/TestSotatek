import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { listPiority } from 'src/app/core/constants/task-const';
import { TaskSotatekEntity } from 'src/app/data/schema/task-sotatek';
import { ComfirmDialogComponent } from 'src/app/shared/common/comfirm-dialog/comfirm-dialog.component';
import { commonFunc } from 'src/app/shared/common/commonFunc';

@Component({
  selector: 'app-selected-item',
  templateUrl: './selected-item.component.html',
  styleUrls: ['./selected-item.component.scss']
})
export class SelectedItemComponent implements OnInit {
  @Input() data: TaskSotatekEntity = {} as TaskSotatekEntity;
  public dateFormated: any;
  public lsttPiority = listPiority;
  public ckDate = false;
  @Output() selectedItemEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteItemEmit: EventEmitter<any> = new EventEmitter();
  @Output() changeCkItemEmit: EventEmitter<any> = new EventEmitter();
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dateFormated = commonFunc.formatDateTime(this.data.dueDate) ?? '';
    this.checkDate();
  }

  clickDetail = () => {
    this.data.isSelected = !this.data.isSelected;
  }

  clickRemove = () => {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.deleteItemEmit.emit(this.data);
        this.toastr.success('Save success!');
      }
    });
  }

  onChange = () => {
    this.changeCkItemEmit.emit(this.data);
  }

  onSubmit = () => {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.data.dueDate = new Date(this.dateFormated);
        this.selectedItemEmit.emit(this.data);
        this.toastr.success('Save success!');
      }
    });

  }

  checkDate = () => {
    this.ckDate = commonFunc.compareDate(new Date(this.dateFormated));
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { listPiority } from "src/app/core/constants/task-const";
import { TaskSotatekEntity } from "src/app/data/schema/task-sotatek";
import { ComfirmDialogComponent } from "src/app/shared/common/comfirm-dialog/comfirm-dialog.component";
import { commonFunc } from "src/app/shared/common/commonFunc";
import { TransferService } from "src/app/shared/common/commonService/transfer-service.service";


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  public data: any;
  @Output() addItemEmit: EventEmitter<any> = new EventEmitter();
  public dateFormated: any;
  public lstPiority = listPiority;
  public formGroupName: FormGroup | undefined;
  public ckDate: boolean = false;
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  initFormGroup = () => {
    if (this.data) {
      this.formGroupName = new FormGroup(
        {
          title: new FormControl(this.data.title, [Validators.required]),
          dueDate: new FormControl(this.data.dueDate, [Validators.required])
        }
      );
    }
  }

  loadData = () => {
    this.data = { piority: this.lstPiority[1].value };
    this.dateFormated = commonFunc.formatDateTime(new Date()) ?? '';
    this.checkDate();
    this.initFormGroup();
  }

  clearForm = () => {
    this.data = {} as TaskSotatekEntity;
    this.data.piority = listPiority[1].value;
  }

  onSubmit = () => {
    const dialogRef = this.dialog.open(ComfirmDialogComponent, {
      width: '250px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.isChecked = this.data.isChecked ?? false;
        this.data.dueDate = new Date(this.dateFormated);
        if (!this.data.id) {
          this.addItemEmit.emit(this.data);
          this.clearForm();
        }
        this.toastr.success('Save success!');
      }
    });

  }

  checkDate = () => {
    this.ckDate = commonFunc.compareDate(new Date(this.dateFormated));
  }
}

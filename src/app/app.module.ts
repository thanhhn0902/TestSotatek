import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './modules/task-component/add-task/add-task.component';
import { SelectedItemComponent } from './modules/task-component/selected-item/selected-item.component';
import { TaskComponentComponent } from './modules/task-component/task-component.component';
import { ToDoListComponent } from './modules/task-component/to-do-list/to-do-list.component';
import { FilterPipe } from './shared/common/pipeFilter';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComfirmDialogComponent } from './shared/common/comfirm-dialog/comfirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponentComponent,
    AddTaskComponent,
    ToDoListComponent,
    SelectedItemComponent,
    FilterPipe,
    ComfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  exports: [MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }

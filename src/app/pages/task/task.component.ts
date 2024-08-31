import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { taskdto } from 'src/app/dtos/Course/task/taskdto';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  displayedColumns: string[] = ['taskid','userid','date','starttime','endtime', 'title', 'mark', 'documentpath'];
  dataSource: MatTableDataSource<taskdto>;
  TaskDTOArray: taskdto[] = [];
  selectedTask: taskdto = new taskdto();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (
    public router: Router,
    public backend: MainService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ){
    this.dataSource = new MatTableDataSource
    this.sort= new MatSort
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.spinner.show();
    let userId = localStorage.getItem('userId');
    if (userId != null)
      this.backend.GetUserTaskByUserId(parseInt(userId)).subscribe(
        (res) => {
          this.spinner.hide();
          this.TaskDTOArray = res;
          this.dataSource.data = this.TaskDTOArray;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    else this.spinner.hide();
    //fill table
  }
  selecttask(row: taskdto) { 
    this.selectedTask = { ...row };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

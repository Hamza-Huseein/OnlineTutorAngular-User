import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { sessiondetailsdto } from 'src/app/dtos/Course/session/sessiondetailsdto';
import { sessiondto } from 'src/app/dtos/Course/session/sessiondto';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  displayedColumns: string[] = ['sessionid','courseid','startdate','starttime', 'endtime', 'capacity', 'numberoflecture','topics','userid'];
  dataSource: MatTableDataSource<sessiondto>;
  
  SessionDTOArray: sessiondto[] = [];
  selectedSession: sessiondto = new sessiondto();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public router:Router,public backend:MainService,
    public spinner: NgxSpinnerService ,public toastr : ToastrService){
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
      this.backend.GetSessionByUserId(parseInt(userId)).subscribe(
        (res) => {
          this.spinner.hide();
          this.SessionDTOArray = res;
          this.dataSource.data = this.SessionDTOArray;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    else this.spinner.hide();
    //fill table
  }
  selectsession(row: sessiondto) { 
    this.selectedSession = { ...row };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

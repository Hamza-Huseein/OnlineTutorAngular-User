import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { certificatedto } from 'src/app/dtos/Course/certificate/certificatedto';
import { invoicedto } from 'src/app/dtos/Course/invoice/invoicedto';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent {
  displayedColumns: string[] = ['certificateid','userid', 'coursename', 'studentevaluation'];
  dataSource: MatTableDataSource<certificatedto>;
  
  CertificateDTOArray: certificatedto[] = [];
  selectedCertificate: certificatedto = new certificatedto();

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
      this.backend.GetCertificateByUserId(parseInt(userId)).subscribe(
        (res) => {
          this.spinner.hide();
          this.CertificateDTOArray = res;
          this.dataSource.data = this.CertificateDTOArray;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    else this.spinner.hide();
    //fill table
  }
  selectcertificate(row: certificatedto) { 
    this.selectedCertificate = { ...row };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

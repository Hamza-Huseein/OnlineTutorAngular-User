import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { invoicedto } from 'src/app/dtos/Course/invoice/invoicedto';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  displayedColumns: string[] = ['invoiceid','userid','date', 'note', 'totalprice','cartId','userId'];
  dataSource: MatTableDataSource<invoicedto>;
  
  InvoiceDTOArray: invoicedto[] = [];
  selectedInvoice: invoicedto = new invoicedto();

  @ViewChild(MatPaginator) paginator: MatPaginator =new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;

  constructor (public router: Router,
    public backend: MainService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService){
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
      this.backend.GetInvoicwByUserId(parseInt(userId)).subscribe(
        (res) => {
          this.spinner.hide();
          this.InvoiceDTOArray = res;
          this.dataSource.data = this.InvoiceDTOArray;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    else this.spinner.hide();
    //fill table
  }
  selectinvoice(row: invoicedto) { 
    this.selectedInvoice = { ...row };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

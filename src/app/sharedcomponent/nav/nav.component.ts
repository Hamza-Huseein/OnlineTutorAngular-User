import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { MainService } from 'src/app/backend/main.service';
import { sessiondto } from 'src/app/dtos/Course/session/sessiondto';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  dataSource: MatTableDataSource<sessiondto>;

constructor(public router:Router,public backend:MainService){
  this.dataSource = new MatTableDataSource

}
NaivageteToLogin()
{
  this.router.navigate(['/login'])
}

}

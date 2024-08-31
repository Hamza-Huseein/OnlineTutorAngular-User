import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { coursedto } from 'src/app/dtos/Course/coursedto';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MainService } from 'src/app/backend/main.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { coursedetailsdto } from 'src/app/dtos/Course/coursedetilsdto';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  num: number = 1;
  courses: coursedto[] = [];

  constructor(
    public router: Router,
    public backend: MainService,
    public spinner: NgxSpinnerService,
    public tostr: ToastrService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.backend.getCourse().subscribe(
      (res) => {
        this.spinner.hide();
        this.courses = res;
      },
      (err) => {
        this.spinner.hide();
        this.tostr.error('Something Went Wrong');
      }
    );
  }

  navigateToDetails(courseId: number | undefined) {
    if (courseId !== undefined) this.router.navigate(['/coursedetails', courseId]);
  }
}
 



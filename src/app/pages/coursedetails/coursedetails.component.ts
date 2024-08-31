import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MainService } from "src/app/backend/main.service";
import { coursedetailsdto } from "src/app/dtos/Course/coursedetilsdto";

@Component({
    selector: 'app-session',
    templateUrl: './coursedetails.component.html',
    styleUrls: ['./coursedetails.component.css']
  })
export class CourseDetailsComponent
{
  courseId: number = 0;
  dto: coursedetailsdto = new coursedetailsdto();

  constructor(
    public backend: MainService,
    public spinner: NgxSpinnerService,
    public tostr: ToastrService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const parmId = params.get('Id');
      if (parmId !== null) {
        this.courseId = parseInt(parmId, 10);
        this.loadCourseDetails(this.courseId);
      }
    });
  }

  loadCourseDetails(Id: number) {
    this.spinner.show();
    this.backend.CourseDetails(Id).subscribe(
      (res) => {
        this.spinner.hide();
        this.dto = res;
      },
      (err) => {
        this.spinner.hide();
        this.tostr.error('Failed To Load course');
        this.router.navigate(['/course']);
      }
    );
  }

}
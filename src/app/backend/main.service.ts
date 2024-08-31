import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { coursedto } from '../dtos/Course/coursedto';
import { sessiondto } from '../dtos/Course/session/sessiondto';
import { taskdto } from '../dtos/Course/task/taskdto';
import { invoicedto } from '../dtos/Course/invoice/invoicedto';
import { certificatedto } from '../dtos/Course/certificate/certificatedto';
import { LoginDTO } from '../dtos/Course/Logindto/logindto';
import { RegistrationDTO } from '../dtos/Course/Registration/RegistrationDTO';
import { coursedetailsdto } from '../dtos/Course/coursedetilsdto';
import { sessiondetailsdto } from '../dtos/Course/session/sessiondetailsdto';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseURL: string = 'https://localhost:44361';

  constructor(private http:HttpClient,private router:Router){}
  getCourse() : Observable<coursedto[]>
  {
    return this.http.get<coursedto[]>(`${this.baseURL}/api/Shared/GetAllCourseDTO`)
  }
  getSession() : Observable<sessiondto[]>
  {
    return this.http.get<sessiondto[]>(`${this.baseURL}/api/Shared/GetAllSessionDTOAdmin`)
  }
  
  getTask() : Observable<taskdto[]>
  {
    return this.http.get<taskdto[]>(`${this.baseURL}/api/Shared/GetAllTask`)
  }
  getInvoice() : Observable<invoicedto[]>
  {
    return this.http.get<invoicedto[]>(`${this.baseURL}/api/Shared/GetAllInvoiceDTOAdmin`)
  }
  getCertificate() : Observable<certificatedto[]>
  {
    return this.http.get<certificatedto[]>(`${this.baseURL}/api/Shared/GetAllCertificateDTOAdmin`)
  }
  Login(input:LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/User/Login`,input, { headers, responseType: 'text' })
  }

  Register(input:RegistrationDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/User/CreateNewAccount`,input, { headers, responseType: 'text' })
  }
  Logout(){
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate([''])
   //return this.http
  }
  CourseDetails(Id:number):Observable<coursedetailsdto> {
    return this.http.get<coursedetailsdto>(`${this.baseURL}/api/Shared/GetCourseById/${Id}`)
  }
  SessionById(Id:number):Observable<sessiondetailsdto> {
    return this.http.get<sessiondetailsdto>(`${this.baseURL}/api/Shared/GetSessionById/${Id}`)
  }
  GetUserTaskByUserId(id:number):Observable<taskdto[]> {
    return this.http.get<taskdto[]>(`${this.baseURL}/api/User/GetUserTaskByUserId?UserId=${id}`)
  }
  GetInvoicwByUserId(id:number):Observable<invoicedto[]> { 
    return this.http.get<invoicedto[]>(`${this.baseURL}/api/User/GetInvoiceByUserId?UserId=${id}`)
  }
  GetSessionByUserId(id:number):Observable<sessiondto[]> {
    return this.http.get<sessiondto[]>(`${this.baseURL}/api/User/GetSessionByUserId?UserId=${id}`)
  }
  GetCertificateByUserId(id:number):Observable<certificatedto[]> {
    return this.http.get<certificatedto[]>(`${this.baseURL}/api/User/GetCertificateByUserId?UserId=${id}`)
  }
 
}

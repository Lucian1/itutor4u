import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  toId =  localStorage.getItem('centerId');
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }
  //show tutor list
  //http://localhost:8080/itutortime/api/allApprovedTeachers
  showPendingTutorList(): Observable<any>{
    console.log("showMessageList function called");
    var headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(this.baseUrl +`allPendingTeachers`,
    {	"id":"6"
   },{headers : headers,responseType:"json"}).pipe(
      map(
        res => {
          console.log(res);
          return res;
          
        }),
        catchError(this.handleError));
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error("Method not implemented.");
  }
}

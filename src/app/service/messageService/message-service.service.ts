import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError} from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Message } from '../../model/app.message';
import { center } from '../../sharingData/user-data';
@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  toId =  localStorage.getItem('centerId');
  baseUrl = environment.baseUrl;
  baseURL = "http://localhost:8080/itutortime/api/";
  constructor(
    private http: HttpClient
  ) { }

  //toMessage
  showMessageList(): Observable<any>{
    console.log("showMessageList function called");
    console.log("centerId is " + center.Id);
    var headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(this.baseUrl +`toMessages.php`,
    {"toid":Number(this.toId),
     "totype":"Center"
   },{headers : headers,responseType:"json"}).pipe(
      map(
        res => {
          console.log(res);
          return res;
          
        }),
        catchError(this.handleError));
  }
  

  //get all messages from  parentId to centerId
  //http://localhost:8080/itutortime/api/fromToMessages.php
//   {"fromid":"6",
// "fromtype":"Center",
// "toid":"6",
//  "totype":"Parent"
// }
allMessages(fromId : number, fromType: string, toId : number, toType: string,) :Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(this.baseUrl +`fromToMessages.php`,
    {"fromid":fromId,
     "fromtype":fromType,
     "toid":toId,
     "totype":toType
},{headers : headers,responseType:"json"}).pipe(
      map(
        res => {
          //onsole.log(res);
          return res;
          
        }),
        catchError(this.handleError));
  }
// send message function  
//http://localhost:8080/itutortime/api/messageSave.php
  sendMessage(fromId : number, fromType: string, toId : number, toType: string, MsgContent: string) :Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(this.baseUrl +`messageSave.php`,
    {
      "fromid":fromId,
      "fromtype":fromType,
      "toid": toId,
      "totype": toType,
      "subject":"New Message",
      "content":MsgContent
   }
   ,{headers : headers,responseType:"text"}).pipe(
      map(
        res => {
          //onsole.log(res);
          return res;
          
        }),
        catchError(this.handleError));
   }
   //handler error
   private handleError(error: any) {
    alert(error.message);
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
  
}

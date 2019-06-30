import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  constructor(
    private http : HttpClient
  ) { }
  celterLogin(email: string, password: string){
    console.log("workd");
    return this.http.post(`http://localhost:8080/itutortime/api/centerLogin.php`,{
      "username":email,
      "password": password
  },{responseType : "json"}).pipe(
        map(user => {
         //console.log(Object.keys(user).length === 0);
          if (Object.keys(user).length != 0) {
            //Do this
            return user;
          } else {
            return null;
          }
        }));
  }
}

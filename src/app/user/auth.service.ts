import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from "./user.model";
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  currentUser: User;
  loginUser(userName: string, password: string) {
    let loginInfo = { username: userName, password: password };
    let options = { headers: new HttpHeaders({ 'ContentType': 'application/json' }) };


    return this.http.post('/api/login', loginInfo, options) // pipe() creates a side effect instead of subscribing.
      .pipe(tap(data => {
        this.currentUser = <User>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false);
      }));
  }

  isAuthenticated() {
    return !!this.currentUser;
  }  

  checkAuthenticatedStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <User>data;
        }
      }))
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = { headers: new HttpHeaders({ 'ContentType': 'application/json' }) };

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logOut() {
    this.currentUser = undefined;
    let options = { headers: new HttpHeaders({ 'ContentType': 'application/json' }) };
    
    return this.http.post('/api/logout', {}, options)
  }
}

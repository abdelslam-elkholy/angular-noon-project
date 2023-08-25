import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/Models/iuser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = {};

  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  signUpUser(newUser: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.BaseApiURL}/users`,
      JSON.stringify(newUser),
      this.http
    );
  }
  checkEmailExists(email: string): Observable<boolean> {
    return this.httpClient
      .get<IUser[]>(`${environment.BaseApiURL}/users`)
      .pipe(
        map((users: IUser[]) =>
          users.some((user: IUser) => user.email === email)
        )
      );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.httpClient.get<IUser[]>(`${environment.BaseApiURL}/users`).pipe(
      map((users: IUser[]) => {
        const user = users.find((u: IUser) => u.email === email);
        if (user && user.password === password) {
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}

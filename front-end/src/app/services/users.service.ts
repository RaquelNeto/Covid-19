import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/users.model';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/api/admin';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true, //Para fazer o setting dos cookies
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(user:User): Observable<User>{
    return this.http.post<User>(endpoint + '/gestaoutilizadores', JSON.stringify(user), httpOptions );
  }


}




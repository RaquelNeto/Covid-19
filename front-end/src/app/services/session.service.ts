import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

import { Observable, BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";

import { environment } from "./../../environments/environment";

import {User} from '../models/users.model';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
  credentials: true,
};

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private utilizadorAtual_Subject: BehaviorSubject<User>;
  public utilizadorAtual: Observable<User>;

  expired: boolean

  session: any = localStorage.getItem('x-authentication')
    ? JSON.parse(localStorage.getItem('x-authentication'))
    : null;

  /**
  private session: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );*/

  constructor(public http: HttpClient) {
    this.utilizadorAtual_Subject = new BehaviorSubject<any>(localStorage.getItem('role'));
    this.utilizadorAtual = this.utilizadorAtual_Subject.asObservable();
  }

   public get valorDoUtilizadorAtual(): any {
    return  localStorage.getItem("role");;
  }

  login(email: string, password: string): Observable<any> {
    this.expired = false;

    const request = this.http.post(
      `${API_URL}/user/login`,
      {
        email,
        password,
      },
      httpOptions
    )
    .pipe(share());

    request.subscribe((response: any) => {
        const { _id,numero_utente, role,token } = response;
        localStorage.setItem("_id", _id);
        localStorage.setItem("numero_utente", numero_utente);
        localStorage.setItem("role", role);
        localStorage.setItem("auth-token", token);
        let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');

      });

    return request;
  }


  me(): Observable<any> {
    return this.http.get(`${API_URL}/user/me`, httpOptions);
  }

  logout() {
    this.expired = false;
    localStorage.removeItem("_id");
        localStorage.removeItem("numero_utente");
        localStorage.removeItem("role");
        localStorage.removeItem("auth-token");

    return this.http.post(`${API_URL}/user/logout`, httpOptions);
  }

  clearSession() {
    this.expired = true;
    localStorage.removeItem("_id");
        localStorage.removeItem("numero_utente");
        localStorage.removeItem("role");
        localStorage.removeItem("auth-token");

  }
}



import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class ApiService { 
  // mock and non-persistent api due to mixed-content errors
  apiURL: string = "https://my-json-server.typicode.com/mhSangar/fake-innocv-api";

  // original URL with HTTP protocol (Stackblitz runs on HTTPS)
  // apiURL: string = "http://hello-world.innocv.com/api";

  constructor(private http: HttpClient) {}

  // GET get all 
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/user`);
  }
  // GET get
  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/user/${id}`);
  }
  // POST create
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/user`, user);
  }
  // PUT update
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/user`, user);
  }
  // DELETE delete
  public deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}/user/${id}`);
  }
}

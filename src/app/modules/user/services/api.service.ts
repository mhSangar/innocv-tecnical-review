import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class ApiService { 
  // apiURL: string = "https://my-json-server.typicode.com/mhSangar/fake-innocv-api";
  apiURL: string = "http://hello-world.innocv.com/api";

  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<User[]>(`${this.apiURL}/user`);
  }

  public getUser(id: number) {
    return this.http.get<User>(`${this.apiURL}/user/${id}`);
  }

  public createUser(user: User) {
    return this.http.post<User>(`${this.apiURL}/user`, user);
  }

  public updateUser(user: User) {
    return this.http.put<User>(`${this.apiURL}/user`, user);
  }

  public deleteUser(id: number) {
    return this.http.delete(`${this.apiURL}/user/${id}`);
  }
}

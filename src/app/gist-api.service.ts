import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from './app.config';
import { Gist } from './gist';

@Injectable({
  providedIn: 'root'
})
export class GistApiService {

  private baseUrl = appConfig.baseUrl;

  constructor(private http: HttpClient) { 
  }

  // /users/{username}/gists
  public getUserGists(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${username}/gists`);
  }
}

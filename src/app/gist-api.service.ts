import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from './app.config';

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

  // /gists/{gist_id}/forks
  public getGistForks(gistId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/gists/${gistId}/forks`);
  }
}

import { Component } from '@angular/core';
import { GistApiService } from './gist-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GistAPI';
  username = '';
  error = false;
  gists: Object[] = [];

  constructor(private gistService: GistApiService) {

  }

  onClear() {
    this.username= '';
    this.error= false;
  }

  onSearch() {
    this.gistService.getUserGists(this.username)
    .subscribe(
      data => {
        console.log('success', data);
        data.forEach(element => {console.log('element', element.gists);}
        )
        // this.gists = data;
      },
      (error) => {
        console.log('oops', error)
        this.error = true
      }
    );
  }
}

import { Component } from '@angular/core';
import { File } from './file';
import { Gist } from './gist';
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
  gistsNb = -1;
  gists: Gist[] = [];

  constructor(private gistService: GistApiService) {

  }

  onClear() {
    this.username= '';
    this.error= false;
    this.gistsNb = -1;
  }

  onSearch() {
    this.gists = [];
    this.gistsNb = -1;
    this.error= false;

    this.gistService.getUserGists(this.username)
    .subscribe(
      data => {
        console.log('success', data);
        this.gistsNb = data.length;

        for (let entry of data) {
          let gist: Gist = new Gist();
          gist.id = entry.id;
          if (entry.description != '') {
            gist.description = entry.description;
          }
          console.log(entry.files);
          
          // for (let fileData of data.files) {
          //   let file: File = new File();
          //   file.filename = fileData.filename;
          //   file.filetype = fileData.language;
          //   file.raw_url = fileData.raw_url;
          // }

          this.gists.push(gist);
        }
        
      },
      (error) => {
        console.log('oops', error)
        this.error = true
      }
    );

    console.log(this.gists);
    
  }
}

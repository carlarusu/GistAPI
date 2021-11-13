import { Component } from '@angular/core';
import { GistFile } from './gistFile';
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

          var keys = Object.keys(entry.files);
          for (let key of keys) {
            // console.log(entry.files[key]);
            let file: GistFile = new GistFile();
            file.filename = entry.files[key].filename;
            file.filetype = entry.files[key].language;
            file.raw_url = entry.files[key].raw_url;

            gist.files.push(file);

            if (!gist.filetypes.includes(file.filetype)) {
              gist.filetypes.push(file.filetype)
            }
          }

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

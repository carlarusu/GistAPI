import { Component } from '@angular/core';
import { GistFile } from './model/gistFile';
import { Gist } from './model/gist';
import { GistApiService } from './gist-api.service';
import { Fork } from './model/fork';

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
    // reset results
    this.gists = [];
    this.gistsNb = -1;
    this.error= false;

    // get gists
    this.gistService.getUserGists(this.username)
    .subscribe(
      data => {
        console.log(data);
        
        this.gistsNb = data.length;

        for (let entry of data) {
          // create new gist
          let gist: Gist = new Gist();

          // get id and description
          gist.id = entry.id;
          if (entry.description) {
            gist.description = entry.description;
          }

          // get file info
          var keys = Object.keys(entry.files);
          for (let key of keys) {
            let file: GistFile = new GistFile();
            file.filename = entry.files[key].filename;
            file.filetype = entry.files[key].language;
            file.raw_url = entry.files[key].raw_url;

            gist.files.push(file);

            if (!gist.filetypes.includes(file.filetype)) {
              gist.filetypes.push(file.filetype)
            }
          }

          // get forks
          gist.forks = this.getForks(gist.id);
          
          this.gists.push(gist);
        }
        
      },
      (error) => {
        this.error = true
      }
    );
  }

  getForks(gistId: string):Fork[] {
    let forks: Fork[] = [];

    this.gistService.getGistForks(gistId)
    .subscribe(
      data => {
        // parse forks
        for (let entry of data) {
          let fork: Fork = new Fork();
          fork.username = entry.owner.login;
          fork.avatar = entry.owner.avatar_url;
          fork.url = entry.git_pull_url;
          fork.createdAt = entry.created_at;

          forks.push(fork);
        }
        
      },
      (error) => {
        this.error = true
      }
    );

    return forks;
  }
}

import { GistFile } from "./gistFile";
import { Fork } from "./fork";

export class Gist {
    description: string = 'No description';
    id: string = '';
    files: GistFile[] = [];
    filetypes: string[] = [];
    forks: Fork[] = [];
}
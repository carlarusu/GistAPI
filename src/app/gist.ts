import { Fork } from "./fork";

export class Gist {
    description: string = 'No description';
    id: string = '';
    files: File[] = [];
    forks: Fork[] = [];
}
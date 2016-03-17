
import {Injectable} from 'angular2/core';

@Injectable()
export class CollectionService {

  collections: Object[];

  constructor() {
    // http.get('api/collections').subscribe(res => {
    //   this.collections = res.json();
    // });
  }

}
// api/people.json

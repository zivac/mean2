
import {Injectable, EventEmitter} from 'angular2/core';
declare var jQuery:any;

@Injectable()
export class ApiService {

  static collections: Object[];
  static collectionEmitter: EventEmitter<any> = new EventEmitter();

  static request(type: String, url: String, data?: Object) {
    return new Promise<Object[]>(function(resolve, reject) {
      jQuery.ajax({
        url: url || 'api/collections',
        type: type || 'GET',
        data: data,
        success: data => resolve(data),
        error: data => reject(data)
      });
    });
  }

  static getCollections() {
    var promise = this.request('GET', 'api/collections', null);
    promise.then(data => this.collections = data);
    return promise;
  }

  static createCollection(data) {
    return this.request('POST', 'api/collections', data);
  }

  static getCollectionItems(collection:String, filters:Object={}, limit:Number=30, skip:Number=0, sort:String='-_id') {
    return this.request('GET', `api/collections/${collection}`, {where:filters, limit:limit, skip:skip, sort:sort});
  }

  static createItem(collection:String, data:Object) {
    return this.request('POST', `api/collections/${collection}`, data);
  }

  static editItem(collection:String, id:String, data:Object) {
    return this.request('POST', `api/collections/${collection}/${id}`, data);
  }

  static deleteItem(collection:String, id:String) {
    return this.request('DELETE', `api/collections/${collection}/${id}`);
  }

}
// api/people.json

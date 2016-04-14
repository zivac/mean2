import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {FORM_DIRECTIVES, COMMON_DIRECTIVES} from 'angular2/common';
import {ApiService} from '../../services/api/api.service';
import {InputComponent} from '../input/input.component';
import {SchemaComponent} from '../schema/schema.component';
declare var jQuery:any;

@Component({
    selector: 'my-list',
    templateUrl: 'app/components/list/list.component.html',
    styleUrls: ['app/components/list/list.component.css'],
    providers: [ApiService],
    directives: [COMMON_DIRECTIVES, InputComponent, SchemaComponent]
})
export class ListComponent {

  collectionName: String;
  collectionItems: Object[];
  collectionData: Object;

  constructor(router: Router, routeParams: RouteParams) {
    this.collectionName = routeParams.get('name');
    ApiService.getCollectionItems(this.collectionName).then(data => this.collectionItems = data);
    this.collectionData = ApiService.collections.find(collection => collection['name'] == this.collectionName);
  }

  ngOnInit() {
    jQuery('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    jQuery('ul.tabs').tabs();
  }

  addNewItem(item:Object={}) {
    if(this.collectionItems.length == 0 || this.collectionItems[0]['_id']) {
      this.collectionItems.unshift(item);
      //allow list item to be added to the dom before triggering a click to open it
      setTimeout(function() {
        jQuery('#item_').find('.collapsible-header').trigger('click')
      }, 0);
    }
  }

  saveItem(item) {
    //let the valueChange event trigger first
    setTimeout(() => {
      if(item._id) ApiService.editItem(this.collectionName, item._id, item).then(function(data) {
        jQuery('#item_'+item._id).find('.collapsible-header').trigger('click')
      });
      else ApiService.createItem(this.collectionName, item).then(function(data) {
        jQuery('#item_').find('.collapsible-header').trigger('click')
        item._id = data['_id'];
      });
    }, 0);
  }

  deleteItem(item) {
    if(item._id) ApiService.deleteItem(this.collectionName, item._id).then(data => this.collectionItems = this.collectionItems.filter(i => i['_id'] != item._id));
    else this.collectionItems = this.collectionItems.filter(i => i['_id']);
  }

  getKeys() {
    return Object.keys(this.collectionData['form']);
  }

  displayItem(item) {
    return JSON.stringify(item);
  }

}

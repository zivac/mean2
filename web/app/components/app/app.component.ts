import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, COMMON_DIRECTIVES} from 'angular2/common';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ListComponent} from '../list/list.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SchemaComponent} from '../schema/schema.component';
import {ApiService} from '../../services/api/api.service';

declare var jQuery:any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app/app.component.html',
    styleUrls: ['app/components/app/app.component.css'],
    providers: [ApiService],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/', name: 'Dashboard', component: DashboardComponent},
  {path:'/:name', name: 'List', component: ListComponent},
  {path:'/schema', name: 'Schema', component: SchemaComponent}
])
export class AppComponent {

  collections: Object[];

  constructor() {
    ApiService.getCollections().then(response => this.collections = response);
    ApiService.collectionEmitter.subscribe(data => {
      console.log(data);
      this.collections.push(data)
    });
  }

  ngOnInit() {
    jQuery(".button-collapse").sideNav({
      menuWidth: 240 // Default is 240
    });
    jQuery('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'bottom' // Displays dropdown with edge aligned to the left of button
    }
  );
  }

}

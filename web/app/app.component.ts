import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ListComponent} from './list/list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SchemaComponent} from './schema/schema.component';

declare var jQuery:any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path:'/', name: 'Dashboard', component: DashboardComponent},
  {path:'/list', name: 'List', component: ListComponent},
  {path:'/schema', name: 'Schema', component: SchemaComponent}
])
export class AppComponent {
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

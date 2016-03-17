import {Component} from 'angular2/core';
declare var jQuery:any;

@Component({
    selector: 'my-list',
    templateUrl: 'app/list/list.component.html',
    styleUrls: ['app/list/list.component.css'],
})
export class ListComponent {
  ngOnInit() {
    jQuery('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  }
}

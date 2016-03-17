import {bootstrap}    from 'angular2/platform/browser'
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);

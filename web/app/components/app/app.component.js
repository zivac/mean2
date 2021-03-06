System.register(['angular2/core', 'angular2/router', '../list/list.component', '../dashboard/dashboard.component', '../schema/schema.component', '../../services/api/api.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, list_component_1, dashboard_component_1, schema_component_1, api_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (schema_component_1_1) {
                schema_component_1 = schema_component_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    var _this = this;
                    api_service_1.ApiService.getCollections().then(function (response) { return _this.collections = response; });
                    api_service_1.ApiService.collectionEmitter.subscribe(function (data) {
                        var collection = _this.collections.find(function (collection) { return collection['name'] == data.name; });
                        if (collection) {
                            collection['blueprint'] = data.blueprint;
                            collection['form'] = data.form;
                            collection['mainField'] = data.mainField;
                        }
                        else
                            _this.collections.push(data);
                    });
                }
                AppComponent.prototype.ngOnInit = function () {
                    jQuery(".button-collapse").sideNav({
                        menuWidth: 240 // Default is 240
                    });
                    jQuery('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrain_width: true,
                        gutter: 0,
                        belowOrigin: true,
                        alignment: 'bottom' // Displays dropdown with edge aligned to the left of button
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/components/app/app.component.html',
                        styleUrls: ['app/components/app/app.component.css'],
                        providers: [api_service_1.ApiService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Dashboard', component: dashboard_component_1.DashboardComponent },
                        { path: '/:name', name: 'List', component: list_component_1.ListComponent },
                        { path: '/schema', name: 'Schema', component: schema_component_1.SchemaComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
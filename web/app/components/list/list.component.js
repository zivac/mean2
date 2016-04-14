System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../services/api/api.service', '../input/input.component', '../schema/schema.component'], function(exports_1) {
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
    var core_1, router_1, common_1, api_service_1, input_component_1, schema_component_1;
    var ListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (input_component_1_1) {
                input_component_1 = input_component_1_1;
            },
            function (schema_component_1_1) {
                schema_component_1 = schema_component_1_1;
            }],
        execute: function() {
            ListComponent = (function () {
                function ListComponent(router, routeParams) {
                    var _this = this;
                    this.collectionName = routeParams.get('name');
                    api_service_1.ApiService.getCollectionItems(this.collectionName).then(function (data) { return _this.collectionItems = data; });
                    this.collectionData = api_service_1.ApiService.collections.find(function (collection) { return collection['name'] == _this.collectionName; });
                }
                ListComponent.prototype.ngOnInit = function () {
                    jQuery('.collapsible').collapsible({
                        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    });
                    jQuery('ul.tabs').tabs();
                };
                ListComponent.prototype.addNewItem = function (item) {
                    if (item === void 0) { item = {}; }
                    if (this.collectionItems.length == 0 || this.collectionItems[0]['_id']) {
                        this.collectionItems.unshift(item);
                        //allow list item to be added to the dom before triggering a click to open it
                        setTimeout(function () {
                            jQuery('#item_').find('.collapsible-header').trigger('click');
                        }, 0);
                    }
                };
                ListComponent.prototype.saveItem = function (item) {
                    var _this = this;
                    //let the valueChange event trigger first
                    setTimeout(function () {
                        if (item._id)
                            api_service_1.ApiService.editItem(_this.collectionName, item._id, item).then(function (data) {
                                jQuery('#item_' + item._id).find('.collapsible-header').trigger('click');
                            });
                        else
                            api_service_1.ApiService.createItem(_this.collectionName, item).then(function (data) {
                                jQuery('#item_').find('.collapsible-header').trigger('click');
                                item._id = data['_id'];
                            });
                    }, 0);
                };
                ListComponent.prototype.deleteItem = function (item) {
                    var _this = this;
                    if (item._id)
                        api_service_1.ApiService.deleteItem(this.collectionName, item._id).then(function (data) { return _this.collectionItems = _this.collectionItems.filter(function (i) { return i['_id'] != item._id; }); });
                    else
                        this.collectionItems = this.collectionItems.filter(function (i) { return i['_id']; });
                };
                ListComponent.prototype.getKeys = function () {
                    return Object.keys(this.collectionData['form']);
                };
                ListComponent.prototype.displayItem = function (item) {
                    return JSON.stringify(item);
                };
                ListComponent = __decorate([
                    core_1.Component({
                        selector: 'my-list',
                        templateUrl: 'app/components/list/list.component.html',
                        styleUrls: ['app/components/list/list.component.css'],
                        providers: [api_service_1.ApiService],
                        directives: [common_1.COMMON_DIRECTIVES, input_component_1.InputComponent, schema_component_1.SchemaComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams])
                ], ListComponent);
                return ListComponent;
            })();
            exports_1("ListComponent", ListComponent);
        }
    }
});
//# sourceMappingURL=list.component.js.map
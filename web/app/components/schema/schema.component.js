System.register(['angular2/core', '../../services/api/api.service', 'angular2/router'], function(exports_1) {
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
    var core_1, api_service_1, router_1;
    var SchemaComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SchemaComponent = (function () {
                function SchemaComponent(_router) {
                    this.router = _router;
                    this.mainField = 'Name';
                }
                SchemaComponent.prototype.ngOnInit = function () {
                    console.log(this.data);
                    var sortableId = "#sortable";
                    if (this.data) {
                        this.name = this.data['name'];
                        this.mainField = this.data['mainField'];
                        sortableId += "_1";
                    }
                    setTimeout(function () {
                        console.log(jQuery(sortableId));
                        jQuery(sortableId).sortable({
                            revert: true,
                            beforeStop: function (event, ui) {
                                var draggedEl = ui.item;
                                if (draggedEl.hasClass('draggable')) {
                                    draggedEl.addClass('row');
                                    draggedEl.addClass('collection-field');
                                    draggedEl.removeClass('draggable');
                                    var icon = draggedEl.find('i').html();
                                    draggedEl.html("\n              <div class=\"col s1\">\n                <i class=\"material-icons\">" + icon + "</i>\n              </div>\n              <div class=\"col s10\">\n                <input type=\"text\" value=\"\" placeholder=\"Field name\" style=\"height:30px;margin-bottom:0\">\n              </div>\n              <div class=\"col s1\">\n                <i class=\"material-icons right delete\" style=\"cursor:pointer\">delete_forever</i>\n              </div>\n            ");
                                    draggedEl.find('.delete').click(function () {
                                        draggedEl.remove();
                                    });
                                }
                            }
                        });
                        jQuery(".draggable").draggable({
                            connectToSortable: sortableId,
                            helper: "clone",
                            revert: "invalid"
                        });
                        //jQuery( "ul, li" ).disableSelection();
                    }, 0);
                };
                SchemaComponent.prototype.getKeys = function () {
                    if (this.data)
                        return Object.keys(this.data['form']);
                    else
                        return [];
                };
                SchemaComponent.prototype.saveCollection = function () {
                    var _this = this;
                    var collectionName = this.name;
                    if (!collectionName)
                        return;
                    var schema = {};
                    var form = {};
                    jQuery('.collection-field').each(function (index, item) {
                        var name = jQuery(item).find('input').val();
                        var type = jQuery(item).data('type');
                        var inputType = jQuery(item).data('input');
                        if (name) {
                            schema[name] = type;
                            form[name] = inputType;
                        }
                    });
                    api_service_1.ApiService.createCollection({ name: collectionName, mainField: this.mainField, blueprint: schema, form: form }).then(function (data) {
                        api_service_1.ApiService.collectionEmitter.emit(data);
                        setTimeout(function () { return _this.router.navigate(['List', { name: collectionName }]); }, 0);
                    });
                };
                SchemaComponent.prototype.updateCollection = function () {
                    console.log('tbd');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], SchemaComponent.prototype, "data", void 0);
                SchemaComponent = __decorate([
                    core_1.Component({
                        selector: 'my-schema',
                        templateUrl: 'app/components/schema/schema.component.html',
                        styleUrls: ['app/components/schema/schema.component.css'],
                        providers: [api_service_1.ApiService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], SchemaComponent);
                return SchemaComponent;
            })();
            exports_1("SchemaComponent", SchemaComponent);
        }
    }
});
//# sourceMappingURL=schema.component.js.map
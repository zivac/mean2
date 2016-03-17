System.register(['angular2/core', '../services/collection.service'], function(exports_1) {
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
    var core_1, collection_service_1;
    var SchemaComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (collection_service_1_1) {
                collection_service_1 = collection_service_1_1;
            }],
        execute: function() {
            SchemaComponent = (function () {
                function SchemaComponent() {
                }
                SchemaComponent.prototype.ngOnInit = function () {
                    jQuery("#sortable").sortable({
                        revert: true,
                        beforeStop: function (event, ui) {
                            var draggedEl = ui.item;
                            if (draggedEl.hasClass('draggable')) {
                                draggedEl.addClass('row');
                                draggedEl.addClass('collection-field');
                                draggedEl.removeClass('draggable');
                                var icon = draggedEl.find('i').html();
                                draggedEl.html("\n            <div class=\"col s1\">\n              <i class=\"material-icons\">" + icon + "</i>\n            </div>\n            <div class=\"col s10\">\n              <input type=\"text\" value=\"\" placeholder=\"Field name\" style=\"height:30px;margin-bottom:0\">\n            </div>\n            <div class=\"col s1\">\n              <i class=\"material-icons right delete\" style=\"cursor:pointer\">delete_forever</i>\n            </div>\n          ");
                                draggedEl.find('.delete').click(function () {
                                    draggedEl.remove();
                                });
                            }
                        }
                    });
                    jQuery(".draggable").draggable({
                        connectToSortable: "#sortable",
                        helper: "clone",
                        revert: "invalid"
                    });
                    jQuery("ul, li").disableSelection();
                };
                SchemaComponent.prototype.saveCollection = function () {
                    var collectionName = this.name;
                    if (!collectionName)
                        return;
                    var schema = {};
                    jQuery('.collection-field').each(function (index, item) {
                        var name = jQuery(item).find('input').val();
                        var type = jQuery(item).data('type');
                        if (name)
                            schema[name] = type;
                    });
                    console.log(schema);
                };
                SchemaComponent = __decorate([
                    core_1.Component({
                        selector: 'my-schema',
                        templateUrl: 'app/schema/schema.component.html',
                        styleUrls: ['app/schema/schema.component.css'],
                        providers: [collection_service_1.CollectionService]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SchemaComponent);
                return SchemaComponent;
            })();
            exports_1("SchemaComponent", SchemaComponent);
        }
    }
});
//# sourceMappingURL=schema.component.js.map
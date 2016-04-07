System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var ApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ApiService = (function () {
                function ApiService() {
                }
                ApiService.request = function (type, url, data) {
                    return new Promise(function (resolve, reject) {
                        jQuery.ajax({
                            url: url || 'api/collections',
                            type: type || 'GET',
                            data: data,
                            success: function (data) { return resolve(data); },
                            error: function (data) { return reject(data); }
                        });
                    });
                };
                ApiService.getCollections = function () {
                    var _this = this;
                    var promise = this.request('GET', 'api/collections', null);
                    promise.then(function (data) { return _this.collections = data; });
                    return promise;
                };
                ApiService.createCollection = function (data) {
                    return this.request('POST', 'api/collections', data);
                };
                ApiService.getCollectionItems = function (collection, filters, limit, skip, sort) {
                    if (filters === void 0) { filters = {}; }
                    if (limit === void 0) { limit = 30; }
                    if (skip === void 0) { skip = 0; }
                    if (sort === void 0) { sort = '-_id'; }
                    return this.request('GET', "api/collections/" + collection, { where: filters, limit: limit, skip: skip, sort: sort });
                };
                ApiService.createItem = function (collection, data) {
                    return this.request('POST', "api/collections/" + collection, data);
                };
                ApiService.editItem = function (collection, id, data) {
                    return this.request('POST', "api/collections/" + collection + "/" + id, data);
                };
                ApiService.deleteItem = function (collection, id) {
                    return this.request('DELETE', "api/collections/" + collection + "/" + id);
                };
                ApiService.collectionEmitter = new core_1.EventEmitter();
                ApiService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ApiService);
                return ApiService;
            })();
            exports_1("ApiService", ApiService);
        }
    }
});
// api/people.json
//# sourceMappingURL=api.service.js.map
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
    var InputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InputComponent = (function () {
                function InputComponent() {
                    this.valueChange = new core_1.EventEmitter();
                }
                InputComponent.prototype.getId = function (name) {
                    return name.replace(' ', '_');
                };
                InputComponent.prototype.emitValueChange = function () {
                    //console.log(this.value)
                    this.valueChange.emit(this.value);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputComponent.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputComponent.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], InputComponent.prototype, "name", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], InputComponent.prototype, "valueChange", void 0);
                InputComponent = __decorate([
                    core_1.Component({
                        selector: 'my-input'
                    }),
                    core_1.View({
                        templateUrl: 'app/components/input/input.component.html',
                        styleUrls: ['app/components/input/input.component.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], InputComponent);
                return InputComponent;
            })();
            exports_1("InputComponent", InputComponent);
        }
    }
});
//# sourceMappingURL=input.component.js.map
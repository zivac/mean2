System.register(['./Vehicle'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Vehicle_1;
    var Car;
    return {
        setters:[
            function (Vehicle_1_1) {
                Vehicle_1 = Vehicle_1_1;
            }],
        execute: function() {
            Car = (function (_super) {
                __extends(Car, _super);
                function Car() {
                    _super.call(this);
                    this.wheels = 4;
                }
                Car.prototype.drive = function () {
                    console.log('wroom');
                };
                return Car;
            })(Vehicle_1.Vehicle);
            exports_1("Car", Car);
        }
    }
});
//# sourceMappingURL=Car.js.map
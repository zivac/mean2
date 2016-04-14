System.register([], function(exports_1) {
    "use strict";
    var Model;
    return {
        setters:[],
        execute: function() {
            Model = (function () {
                function Model() {
                    this._id = 'temp_' + Model.autoIncrementValue;
                    Model.autoIncrementValue += 1;
                }
                ;
                Model.prototype.save = function () {
                    var toSave = JSON.stringify(this, function (key, value) {
                        if (key == "_id" && value.startsWith("temp_"))
                            return undefined;
                        if (key && typeof value === "object" && value._id) {
                            return value._id;
                        }
                        return value;
                    });
                    console.log(toSave);
                };
                Model.autoIncrementValue = 1;
                return Model;
            })();
            exports_1("Model", Model);
        }
    }
});
//# sourceMappingURL=Model.js.map
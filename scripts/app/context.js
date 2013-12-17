/// <reference path="../typings/knockout.d.ts" />
var roleManagement;
(function (roleManagement) {
    var context = (function () {
        function context(id, type) {
            var _this = this;
            this.toString = function () {
                return "ID: " + _this.id() + "; Type: " + _this.type();
            };
            this.id = ko.observable(id);
            this.type = ko.observable(type);
        }
        context.empty = new context(0, "None");
        return context;
    })();
    roleManagement.context = context;
})(roleManagement || (roleManagement = {}));

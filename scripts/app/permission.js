/// <reference path="../typings/knockout.d.ts" />
var roleManagement;
(function (roleManagement) {
    var permission = (function () {
        function permission(id, name) {
            this.id = ko.observable(id);
            this.name = ko.observable(name);
        }
        return permission;
    })();
    roleManagement.permission = permission;

    var permissionGroup = (function () {
        function permissionGroup(id, name, permissions) {
            this.id = ko.observable(id);
            this.name = ko.observable(name);
            this.permissions = ko.observableArray(permissions);
        }
        return permissionGroup;
    })();
    roleManagement.permissionGroup = permissionGroup;
})(roleManagement || (roleManagement = {}));

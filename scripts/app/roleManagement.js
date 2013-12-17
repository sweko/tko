/// <reference path="../typings/knockout.d.ts" />
/// <reference path="role.ts" />
/// <reference path="permission.ts" />
/// <reference path="context.ts" />
/// <reference path="utility.ts" />
/// <reference path="../typings/jquery.d.ts" />
var roleManagement;
(function (roleManagement) {
    var roleManager = (function () {
        function roleManager() {
            var _this = this;
            this.sortRoles = function () {
                _this.roles.sort(function (f, s) {
                    var frank = f.rank();
                    var srank = s.rank();
                    if (frank < srank)
                        return -1;
                    if (frank > srank)
                        return 1;
                    if (frank === srank)
                        return 0;
                });

                _this.maxRank(_this.roles()[_this.roles().length - 1].rank());
                _this.maxId(utility.max(_this.roles(), function (r) {
                    return r.roleId();
                }));
            };
            this.isDialogOpen = ko.observable(false);
            this.currentRole = ko.observable(null);
            this.createNewRole = function () {
                _this.currentRole(new roleManagement.role(_this, _this.maxId() + 1, "", _this.maxRank() + 1));
                _this.isDialogOpen(true);
            };
            this.editCurrentRole = function (role) {
                if (role) {
                    _this.currentRole(role.copy());
                    _this.isDialogOpen(true);
                }
            };
            this.saveCurrentRole = function () {
                if (!_this.currentRole().isValid())
                    return;

                var currentId = _this.currentRole().roleId();
                var existing = ko.utils.arrayFirst(_this.roles(), function (item) {
                    return item.roleId() === currentId;
                });
                if (existing) {
                    var index = ko.utils.arrayIndexOf(_this.roles(), existing);
                    _this.roles()[index] = _this.currentRole();
                } else {
                    _this.roles.push(_this.currentRole());
                }
                _this.sortRoles();
                _this.isDialogOpen(false);
            };
            this.isDeleteDialogOpen = ko.observable(false);
            this.roleToDelete = ko.observable(null);
            this.deleteCheck = function (role) {
                _this.roleToDelete(role);
                _this.isDeleteDialogOpen(true);
            };
            this.deleteRole = function (role) {
                _this.roles.remove(role);
                _this.isDeleteDialogOpen(false);
                _this.roleToDelete(null);
            };
            this.cancelDelete = function () {
                _this.isDeleteDialogOpen(false);
                _this.roleToDelete(null);
            };
            this.allContexts = ko.observableArray(utility.getAllContexts());
            this.allPermissions = ko.observableArray(utility.getAllPermissions());

            this.maxRank = ko.observable(0);
            this.maxId = ko.observable(0);
            this.roles = ko.observableArray(utility.getAllRoles(this));

            this.sortRoles();
        }
        return roleManager;
    })();
    roleManagement.roleManager = roleManager;
    ;
})(roleManagement || (roleManagement = {}));

$(function () {
    ko.applyBindings(new roleManagement.roleManager());
});

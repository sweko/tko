/// <reference path="../typings/knockout.d.ts" />
/// <reference path="roleManagement.ts" />
/// <reference path="permission.ts" />
/// <reference path="utility.ts" />
var roleManagement;
(function (roleManagement) {
    var role = (function () {
        function role(parentViewModel, id, name, rank, description, contextId) {
            if (typeof description === "undefined") { description = ""; }
            if (typeof contextId === "undefined") { contextId = 0; }
            var _this = this;
            this.loadPermissions = function () {
                return _this.permissions(utility.getPermissionsForRole(_this.roleId()));
            };
            this.loadUsers = function () {
                return _this.users(utility.getUsersForRole(_this.roleId()));
            };
            this.areUsersVisible = ko.observable(false);
            this.toggleUsersVisibility = function () {
                return _this.areUsersVisible(!_this.areUsersVisible());
            };
            this.arePermissionsVisible = ko.observable(false);
            this.togglePermissionsVisibility = function () {
                return _this.arePermissionsVisible(!_this.arePermissionsVisible());
            };
            this.initValidationComputeds = function () {
                //poor-man's knockout validation
                _this.isRoleNameValid = ko.computed(function () {
                    return _this.roleName() !== "";
                });
                _this.isRoleNameUnique = ko.computed(function () {
                    if ((!_this.parentViewModel()) || (!_this.parentViewModel().roles))
                        return true;
                    var match = ko.utils.arrayFirst(_this.parentViewModel().roles(), function (item) {
                        return item.roleName() === _this.roleName() && item.roleId() !== _this.roleId();
                    });
                    return (match) ? false : true;
                });
                _this.isValid = ko.computed(function () {
                    return _this.isRoleNameValid() && _this.isRoleNameUnique();
                });
            };
            this.hasPermission = function (permission) {
                return utility.isInArray(_this.permissions(), permission, function (p) {
                    return p.id();
                });
            };
            this.togglePermission = function (permission) {
                if (utility.isInArray(_this.permissions(), permission, function (p) {
                    return p.id();
                })) {
                    _this.permissions.remove(function (p) {
                        return p.id() === permission.id();
                    });
                } else {
                    _this.permissions.push(permission);
                }
                return true;
            };
            this.copy = function () {
                var result = new role(_this.parentViewModel(), _this.roleId(), _this.roleName(), _this.rank(), _this.description(), _this.contextId());
                result.permissions(_this.permissions());
                result.users(_this.users());
                return result;
            };
            this.upRank = function () {
                if (_this.rank() <= 1)
                    return;

                var oldRank = _this.rank();
                var newRank = _this.rank() - 1;

                var other = ko.utils.arrayFirst(_this.parentViewModel().roles(), function (item) {
                    return item.rank() === newRank;
                });
                if (other)
                    other.rank(oldRank);
                _this.rank(newRank);
                _this.parentViewModel().sortRoles();
            };
            this.downRank = function () {
                if (_this.rank() >= _this.parentViewModel().maxRank())
                    return;

                var oldRank = _this.rank();
                var newRank = _this.rank() + 1;

                var other = ko.utils.arrayFirst(_this.parentViewModel().roles(), function (item) {
                    return item.rank() === newRank;
                });
                if (other)
                    other.rank(oldRank);
                _this.rank(newRank);
                _this.parentViewModel().sortRoles();
            };
            this.roleId = ko.observable(id);
            this.roleName = ko.observable(name);
            this.rank = ko.observable(rank);
            this.description = ko.observable(description);
            this.contextId = ko.observable(contextId);
            this.users = ko.observableArray([]);
            this.permissions = ko.observableArray([]);
            this.parentViewModel = ko.observable(parentViewModel);

            this.hasUsersCheck = ko.computed(function () {
                return _this.users().length !== 0;
            });
            this.hasPermissionsCheck = ko.computed(function () {
                return _this.permissions().length !== 0;
            });

            this.canUpRank = ko.computed(function () {
                return _this.rank() > 1;
            });
            this.canDownRank = ko.computed(function () {
                return _this.rank() < _this.parentViewModel().maxRank();
            });

            this.context = ko.computed({
                read: function () {
                    var context = ko.utils.arrayFirst(_this.parentViewModel().allContexts(), function (item) {
                        return item.id() === _this.contextId();
                    });
                    return context || roleManagement.context.empty;
                },
                write: function (value) {
                    return _this.contextId(value.id());
                }
            });

            this.loadPermissions();
            this.loadUsers();

            this.initValidationComputeds();
        }
        return role;
    })();
    roleManagement.role = role;
})(roleManagement || (roleManagement = {}));

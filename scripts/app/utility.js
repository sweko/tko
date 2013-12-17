var utility;
(function (utility) {
    (function (FormState) {
        FormState[FormState["List"] = 0] = "List";
        FormState[FormState["New"] = 1] = "New";
        FormState[FormState["Edit"] = 2] = "Edit";
    })(utility.FormState || (utility.FormState = {}));
    var FormState = utility.FormState;

    function getAllContexts() {
        return [
            new roleManagement.context(0, "None"),
            new roleManagement.context(1, "Employee"),
            new roleManagement.context(2, "Division"),
            new roleManagement.context(3, "Branch Office")
        ];
    }
    utility.getAllContexts = getAllContexts;

    function getAllPermissions() {
        var accessPermissions = [
            new roleManagement.permission(1, "Access Notification Menu"),
            new roleManagement.permission(2, "Access Administration Menu"),
            new roleManagement.permission(3, "Access Employee Menu")
        ];

        var infoManagementPermissions = [
            new roleManagement.permission(4, "View Personal Details"),
            new roleManagement.permission(5, "Edit Personal Details"),
            new roleManagement.permission(6, "View Contract Information"),
            new roleManagement.permission(7, "Edit Contract Information")
        ];

        return [
            new roleManagement.permissionGroup(1, "Access Permissions", accessPermissions),
            new roleManagement.permissionGroup(2, "Info Management Permissions", infoManagementPermissions)
        ];
    }
    utility.getAllPermissions = getAllPermissions;

    function getAllRoles(parent) {
        return [
            new roleManagement.role(parent, 1, "Admin", 1, "System Administrator", 0),
            new roleManagement.role(parent, 2, "Viewer", 2, "Only View Permission", 0),
            new roleManagement.role(parent, 3, "EmployeeEditor", 3, "Can edit single employee", 1),
            new roleManagement.role(parent, 4, "Division Manager", 4, "Can manage division", 2),
            new roleManagement.role(parent, 5, "Restricted", 5, "No Permissions", 0)
        ];
    }
    utility.getAllRoles = getAllRoles;

    function getPermissionsForRole(roleId) {
        switch (roleId) {
            case 1:
                return [
                    new roleManagement.permission(1, "Access Notification Menu"),
                    new roleManagement.permission(2, "Access Administration Menu"),
                    new roleManagement.permission(3, "Access Employee Menu"),
                    new roleManagement.permission(4, "View Personal Details"),
                    new roleManagement.permission(5, "Edit Personal Details"),
                    new roleManagement.permission(6, "View Contract Information"),
                    new roleManagement.permission(7, "Edit Contract Information")
                ];
            case 2:
                return [
                    new roleManagement.permission(1, "Access Notification Menu"),
                    new roleManagement.permission(3, "Access Employee Menu"),
                    new roleManagement.permission(4, "View Personal Details"),
                    new roleManagement.permission(6, "View Contract Information")
                ];
            case 3:
                return [
                    new roleManagement.permission(3, "Access Employee Menu"),
                    new roleManagement.permission(4, "View Personal Details"),
                    new roleManagement.permission(5, "Edit Personal Details"),
                    new roleManagement.permission(6, "View Contract Information"),
                    new roleManagement.permission(7, "Edit Contract Information")
                ];
            case 4:
                return [
                    new roleManagement.permission(1, "Access Notification Menu"),
                    new roleManagement.permission(3, "Access Employee Menu"),
                    new roleManagement.permission(4, "View Personal Details"),
                    new roleManagement.permission(5, "Edit Personal Details"),
                    new roleManagement.permission(6, "View Contract Information"),
                    new roleManagement.permission(7, "Edit Contract Information")
                ];
            case 5:
            default:
                return [];
        }
    }
    utility.getPermissionsForRole = getPermissionsForRole;

    function getUsersForRole(roleId) {
        switch (roleId) {
            case 1:
                return ["Admin Adminson", "One Two"];
            case 2:
                return ["Tom Peeping"];
            case 3:
                return [];
            case 4:
                return ["Big Cahuna", "Head Honcho", "Chaush Efendi"];
            case 4:
                return ["Cee Noevil", "Hir Noevil"];
            default:
                return [];
        }
    }
    utility.getUsersForRole = getUsersForRole;

    function isInArray(array, item, keySelector) {
        var itemKey = keySelector(item);
        var match = ko.utils.arrayFirst(array, function (aitem) {
            return keySelector(aitem) === itemKey;
        });
        return (match) ? true : false;
    }
    utility.isInArray = isInArray;

    function isInArrayLiteral(array, item, keySelector) {
        var match = ko.utils.arrayFirst(array, function (aitem) {
            return keySelector(aitem) === item;
        });
        return (match) ? true : false;
    }
    utility.isInArrayLiteral = isInArrayLiteral;

    function max(array, evaluator) {
        if (array.length === 0)
            return null;
        var max = evaluator(array[0]);
        for (var index = 1; index < array.length; index++) {
            var current = evaluator(array[index]);
            if (max < current)
                max = current;
        }
        return max;
    }
    utility.max = max;
})(utility || (utility = {}));

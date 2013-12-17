module utility
{
	export enum FormState {
  		List,
  		New,
  		Edit
	}
	
	export function getAllContexts() {
		return [
			new roleManagement.context(0, "None"),
			new roleManagement.context(1, "Employee"),
			new roleManagement.context(2, "Division"),
			new roleManagement.context(3, "Branch Office"),
		];
	}
	
	export function getAllPermissions() {
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
	
	export function getAllRoles(parent: roleManagement.roleManager) {
		return [
			new roleManagement.role(parent, 1, "Admin", 1, "System Administrator", 0),
			new roleManagement.role(parent, 2, "Viewer", 2, "Only View Permission", 0),
			new roleManagement.role(parent, 3, "EmployeeEditor", 3, "Can edit single employee", 1),
			new roleManagement.role(parent, 4, "Division Manager", 4, "Can manage division", 2),
			new roleManagement.role(parent, 5, "Restricted", 5, "No Permissions", 0),
		];
	}
	
	export function getPermissionsForRole(roleId: number) : roleManagement.permission[]
	{
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
			        new roleManagement.permission(6, "View Contract Information"),
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
	
	export function getUsersForRole(roleId: number) : string[]
	{
		switch (roleId) {
			case 1:
			    return [ "Admin Adminson", "One Two"];
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
	
	export function isInArray<T, U>(array: T[], item: T, keySelector: (item: T) => U) {
		var itemKey = keySelector(item);
        var match = ko.utils.arrayFirst(array, function (aitem) {
            return keySelector(aitem) === itemKey;
        });
        return (match) ? true : false;
    }
	
	export function isInArrayLiteral<T, U>(array: T[], item: U, keySelector: (item: T) => U) {
        var match = ko.utils.arrayFirst(array, function (aitem) {
            return keySelector(aitem) === item;
        });
        return (match) ? true : false;
    }
	
	export function max<T, U>(array: T[], evaluator: (item:T) => U)
	{
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
	
}
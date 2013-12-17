/// <reference path="../typings/knockout.d.ts" />
/// <reference path="role.ts" />
/// <reference path="permission.ts" />
/// <reference path="context.ts" />
/// <reference path="utility.ts" />
/// <reference path="../typings/jquery.d.ts" />



module roleManagement {

	export class roleManager {

		public allContexts: KnockoutObservableArray<context>;
		public allPermissions: KnockoutObservableArray<permissionGroup>;
		public roles: KnockoutObservableArray<role>;

		public maxRank: KnockoutObservable<number>;
		private maxId: KnockoutObservable<number>;

		constructor() {
			this.allContexts = ko.observableArray(utility.getAllContexts());
			this.allPermissions = ko.observableArray(utility.getAllPermissions());

			this.maxRank = ko.observable(0);
			this.maxId = ko.observable(0);
			this.roles = ko.observableArray(utility.getAllRoles(this));

			this.sortRoles();
		}

		public sortRoles = () => {
			this.roles.sort((f, s) => {
				var frank = f.rank();
				var srank = s.rank();
				if (frank < srank)
					return -1;
				if (frank > srank)
					return 1;
				if (frank === srank)
					return 0;
			});

			this.maxRank(this.roles()[this.roles().length - 1].rank());
			this.maxId(utility.max(this.roles(), (r) => r.roleId()));
		};

		public isDialogOpen: KnockoutObservable<boolean> = ko.observable(false);
		public currentRole: KnockoutObservable<role> = ko.observable(null);

		public createNewRole = () => {
			this.currentRole(new role(this, this.maxId() + 1, "", this.maxRank() + 1));
			this.isDialogOpen(true);
		};
		
		public editCurrentRole = (role: role) => {
        	if (role) {
            	this.currentRole(role.copy());
            	this.isDialogOpen(true);
        	}
    	};

		public saveCurrentRole = () => {
			if (!this.currentRole().isValid())
				return;
			
			var currentId = this.currentRole().roleId();
			var existing = ko.utils.arrayFirst(this.roles(), (item) => item.roleId() === currentId);
			if (existing)
			{
				var index = ko.utils.arrayIndexOf(this.roles(), existing);
				this.roles()[index] = this.currentRole();	 
			}
			else
			{
				this.roles.push(this.currentRole());
			}
			this.sortRoles();
			this.isDialogOpen(false);
		};
		
		public isDeleteDialogOpen: KnockoutObservable<boolean> = ko.observable(false);
    	public roleToDelete: KnockoutObservable<role> = ko.observable(null);

	    public deleteCheck = (role: role) => {
    	    this.roleToDelete(role);
        	this.isDeleteDialogOpen(true);
    	};

    	public deleteRole = (role: role) => {
        	this.roles.remove(role);
        	this.isDeleteDialogOpen(false);
        	this.roleToDelete(null);
    	};

    	public cancelDelete = () => {
        	this.isDeleteDialogOpen(false); 
        	this.roleToDelete(null);
    	};

	};
}


$(function() {
	ko.applyBindings(new roleManagement.roleManager());
});
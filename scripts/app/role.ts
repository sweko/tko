/// <reference path="../typings/knockout.d.ts" />
/// <reference path="roleManagement.ts" />
/// <reference path="permission.ts" />
/// <reference path="utility.ts" />

module roleManagement {

	export class role {

		public roleId: KnockoutObservable<number>;
		public roleName: KnockoutObservable<string>;
		public rank: KnockoutObservable<number>;
		public description: KnockoutObservable<string>;
		public contextId: KnockoutObservable<number>;
		public users: KnockoutObservableArray<string>;
		public permissions: KnockoutObservableArray<permission>;

		public parentViewModel: KnockoutObservable<roleManager>;

		public hasUsersCheck: KnockoutComputed<boolean>;
		public hasPermissionsCheck: KnockoutComputed<boolean>;

		public canUpRank: KnockoutComputed<boolean>;
		public canDownRank: KnockoutComputed<boolean>;

		public context: KnockoutComputed<context>;

		constructor(parentViewModel: roleManager, id: number, name: string, rank: number, description: string = "", contextId: number = 0) {
			this.roleId = ko.observable(id);
			this.roleName = ko.observable(name);
			this.rank = ko.observable(rank);
			this.description = ko.observable(description);
			this.contextId = ko.observable(contextId);
			this.users = ko.observableArray<string>([]);
			this.permissions = ko.observableArray<permission>([]);
			this.parentViewModel = ko.observable(parentViewModel);

			this.hasUsersCheck = ko.computed(() => this.users().length !== 0);
			this.hasPermissionsCheck = ko.computed(() => this.permissions().length !== 0);

			this.canUpRank = ko.computed(() => this.rank() > 1);
			this.canDownRank = ko.computed(() => this.rank() < this.parentViewModel().maxRank());

			this.context = ko.computed({
				read: () => {
					var context = ko.utils.arrayFirst(this.parentViewModel().allContexts(), (item) => item.id() === this.contextId());
					return context || roleManagement.context.empty;
				},
				write: (value: context) => this.contextId(value.id())
			});

			this.loadPermissions();
			this.loadUsers();
			
			this.initValidationComputeds();
			
		}

		public loadPermissions = () => this.permissions(utility.getPermissionsForRole(this.roleId()));
		public loadUsers = () => this.users(utility.getUsersForRole(this.roleId()));
		
		public areUsersVisible: KnockoutObservable<boolean> = ko.observable(false);
    	public toggleUsersVisibility = () => this.areUsersVisible(!this.areUsersVisible());
		
		public arePermissionsVisible: KnockoutObservable<boolean> = ko.observable(false);
    	public togglePermissionsVisibility = () => this.arePermissionsVisible(!this.arePermissionsVisible());
		
		public isRoleNameValid : KnockoutComputed<boolean>;
		public isRoleNameUnique: KnockoutComputed<boolean>;
		public isValid: KnockoutComputed<boolean>;
		
		public initValidationComputeds = () => {
	        //poor-man's knockout validation
			this.isRoleNameValid = ko.computed(() => this.roleName() !== "");
			this.isRoleNameUnique = ko.computed(() => {
        		if ((!this.parentViewModel()) || (!this.parentViewModel().roles))
            		return true;
	        	var match = ko.utils.arrayFirst(this.parentViewModel().roles(), (item) => {
	            	return item.roleName() === this.roleName() && item.roleId() !== this.roleId();
	        	});
				return (match) ? false : true;
	    	});
			this.isValid = ko.computed(() => this.isRoleNameValid() && this.isRoleNameUnique());
		};
		
		public hasPermission = (permission) => utility.isInArray(this.permissions(), permission, p => p.id());
		
		public togglePermission = (permission) => {
        	if (utility.isInArray(this.permissions(), permission, p => p.id())) {
            	this.permissions.remove(p => p.id() === permission.id());
        	}
        	else {
            	this.permissions.push(permission);
        	}
        	return true;
    	};
		
		public copy = () => {
        	var result = new role(this.parentViewModel(), this.roleId(), this.roleName(), this.rank(), this.description(), this.contextId());
        	result.permissions(this.permissions());
			result.users(this.users());
        	return result;
    	};
		
		public upRank = () => {
        	if (this.rank() <= 1)
            	return;

        	var oldRank = this.rank();
        	var newRank = this.rank() - 1;

        	var other = ko.utils.arrayFirst(this.parentViewModel().roles(), (item) => item.rank() === newRank );
        	if (other)
            	other.rank(oldRank);
        	this.rank(newRank);
        	this.parentViewModel().sortRoles();
    	};

    	public downRank = () => {
	        if (this.rank() >= this.parentViewModel().maxRank())
    	        return;

	        var oldRank = this.rank();
    	    var newRank = this.rank() + 1;

        	var other = ko.utils.arrayFirst(this.parentViewModel().roles(), (item) => item.rank() === newRank);
        	if (other)
            	other.rank(oldRank);
        	this.rank(newRank);
        	this.parentViewModel().sortRoles();
    	};		
	}
}
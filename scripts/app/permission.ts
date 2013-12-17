/// <reference path="../typings/knockout.d.ts" />

module roleManagement {

    export class permission {

        public id: KnockoutObservable<number>;
        public name: KnockoutObservable<string>;

        constructor(id: number, name: string) {
            this.id = ko.observable(id);
            this.name = ko.observable(name);
        }
    }

    export class permissionGroup {
        public id: KnockoutObservable<number>;
        public name: KnockoutObservable<string>;
        public permissions: KnockoutObservableArray<permission>;

        constructor(id: number, name: string, permissions: permission[]) {
            this.id = ko.observable(id);
            this.name = ko.observable(name);
            this.permissions = ko.observableArray(permissions);
        }
    }
}
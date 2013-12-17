/// <reference path="../typings/knockout.d.ts" />

module roleManagement {

    export class context {

        public id: KnockoutObservable<number>;
        public type: KnockoutObservable<string>;

        constructor(id: number, type: string) {
            this.id = ko.observable(id);
            this.type = ko.observable(type);
        }

        public toString = ()  => "ID: " + this.id() + "; Type: " + this.type();

        public static empty = new context(0, "None");
    }
}
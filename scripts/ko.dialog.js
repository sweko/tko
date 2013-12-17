ko.bindingHandlers.dialog = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = ko.utils.unwrapObservable(valueAccessor()) || {};
        //do in a setTimeout, so the applyBindings doesn't bind twice from element being copied and moved to bottom
        setTimeout(function () {
            options.close = function () {
                allBindingsAccessor().dialogVisible(false);
            };

            if (typeof options.autoOpen === "undefined")
                options.autoOpen = false;
            if (typeof options.modal === "undefined")
                options.modal = true;
            if (typeof options.draggable === "undefined")
                options.draggable = false;
            if (typeof options.resizable === "undefined")
                options.resizable = false;

            $(element).dialog(options);
        }, 0);

        //handle disposal (not strictly necessary in this scenario)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).dialog("destroy");
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var shouldBeOpen = ko.utils.unwrapObservable(allBindingsAccessor().dialogVisible);
        var $el = $(element);
        var dialog = $el.data("ui-dialog") || $el.data("uiDialog") || $el.data("dialog");

        //don't call open/close before initilization
        if (dialog) {
            $el.dialog(shouldBeOpen ? "open" : "close");
        }
    }
};
System.register(["./tag-manager", "./configure"], function (exports_1, context_1) {
    "use strict";
    var tag_manager_1, configure_1;
    var __moduleName = context_1 && context_1.id;
    function configure(aurelia, configCallback) {
        var instance = aurelia.container.get(tag_manager_1.TagManager);
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(instance);
        }
        //aurelia.globalResources([]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (tag_manager_1_1) {
                tag_manager_1 = tag_manager_1_1;
            },
            function (configure_1_1) {
                configure_1 = configure_1_1;
            }
        ],
        execute: function () {
            exports_1("TagManager", tag_manager_1.TagManager);
            exports_1("Configure", configure_1.Configure);
        }
    };
});

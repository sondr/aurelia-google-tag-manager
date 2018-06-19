define(["require", "exports", "./tag-manager", "./configure"], function (require, exports, tag_manager_1, configure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagManager = tag_manager_1.TagManager;
    exports.Configure = configure_1.Configure;
    function configure(aurelia, configCallback) {
        var instance = aurelia.container.get(tag_manager_1.TagManager);
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(instance);
        }
        //aurelia.globalResources([]);
    }
    exports.configure = configure;
});

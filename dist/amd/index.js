define(["require", "exports", "./tag-manager"], function (require, exports, tag_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TagManager = exports.configure = void 0;
    Object.defineProperty(exports, "TagManager", { enumerable: true, get: function () { return tag_manager_1.TagManager; } });
    function configure(aurelia, configCallback) {
        var instance = aurelia.container.get(tag_manager_1.TagManager);
        if (configCallback !== undefined && typeof (configCallback) === 'function') {
            configCallback(instance);
        }
        //aurelia.globalResources([]);
    }
    exports.configure = configure;
});
//export { Configure };

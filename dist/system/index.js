System.register(["./tag-manager"], function (exports_1, context_1) {
    "use strict";
    var tag_manager_1;
    var __moduleName = context_1 && context_1.id;
    //import { Configure, ConfigInterface } from './configure';
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
            }
        ],
        execute: function () {
            //export { TagManager };
        }
    };
});

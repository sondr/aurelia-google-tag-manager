"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tag_manager_1 = require("./tag-manager");
exports.TagManager = tag_manager_1.TagManager;
function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(tag_manager_1.TagManager);
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }
    //aurelia.globalResources([]);
}
exports.configure = configure;
//export { Configure };

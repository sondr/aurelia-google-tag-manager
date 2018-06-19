import { TagManager } from './tag-manager';
import { Configure } from './configure';
export function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(TagManager);
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }
    //aurelia.globalResources([]);
}
export { Configure };
export { TagManager };

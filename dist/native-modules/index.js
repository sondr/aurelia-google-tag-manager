import { TagManager } from './tag-manager';
export function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(TagManager);
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }
    //aurelia.globalResources([]);
}
export { TagManager };
//export { Configure };

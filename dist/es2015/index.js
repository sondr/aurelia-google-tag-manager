import { TagManager } from './tag-manager';
//import { Configure, ConfigInterface } from './configure';
export function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(TagManager);
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }
    //aurelia.globalResources([]);
}
//export { TagManager };

import { FrameworkConfiguration } from 'aurelia-framework';
import { TagManager } from './tag-manager';
import { OptionsInterface  } from './configure';

export function configure(aurelia: FrameworkConfiguration, configCallback?: (config: any) => Promise<any>) {

    let instance = aurelia.container.get(TagManager) as TagManager;

    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        configCallback(instance);
    }

    //aurelia.globalResources([]);
}

export { TagManager };
export { OptionsInterface };
//export { Configure };

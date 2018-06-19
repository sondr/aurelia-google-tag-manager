import { FrameworkConfiguration } from 'aurelia-framework';
import { TagManager } from './tag-manager';
import { Configure } from './configure';
export declare function configure(aurelia: FrameworkConfiguration, configCallback?: (config: any) => Promise<any>): void;
export { Configure };
export { TagManager };

export interface ConfigInterface {
    key: string;
    enabled: boolean;
    pageTracking: PropertyOptions;
    logging: PropertyOptions;
    [key: string]: string | boolean | PropertyOptions;
}
export interface PropertyOptions {
    enabled: boolean;
}
export declare class Configure {
    private _options;
    constructor();
    options(opts: string | ConfigInterface): false | ConfigInterface;
    getOptions(): ConfigInterface;
    get(key: string): string | boolean | PropertyOptions;
}

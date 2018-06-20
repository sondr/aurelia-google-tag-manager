export interface OptionsInterface {
    key: string;
    enabled: boolean;
    pageTracking: PropertyOptions;
    logging: PropertyOptions;
    [key: string]: string | boolean | PropertyOptions;
}
export interface PropertyOptions {
    name?: string;
    enabled?: boolean;
}
export declare class Configure {
    private _options;
    constructor();
    options(opts: string | OptionsInterface): false | OptionsInterface;
    getOptions(): OptionsInterface;
    get(key: string): string | boolean | PropertyOptions;
}

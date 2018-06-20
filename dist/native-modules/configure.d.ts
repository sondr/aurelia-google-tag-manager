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
    toggleEnabled: (value?: boolean) => void;
}
export declare class Configure {
    private _options;
    constructor();
    options(opts: string | OptionsInterface): OptionsInterface;
    getOptions(): OptionsInterface;
    get(key: string): string | boolean | PropertyOptions;
}

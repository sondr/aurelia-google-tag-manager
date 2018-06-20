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
    toggleEnabled: (value?: boolean) => void
}


export class Configure {
    private _options: OptionsInterface;

    constructor() {
        this._options = {
            key: '',
            enabled: true,
            pageTracking: {
                name: 'PageView',
                enabled: true,
                toggleEnabled: (value) => { this._options.pageTracking.enabled = value || !this._options.pageTracking.enabled }
            },
            logging: {
                enabled: false,
                toggleEnabled: (value) => { this._options.logging.enabled = value || !this._options.logging.enabled }
            }
        };
    }

    options(opts: string | OptionsInterface) {
        if (!opts) this._options.enabled = false;
        else if (typeof opts === 'string') this._options.key = opts;
        else Object.assign(this._options, opts);
        return this._options;
    }

    getOptions() {
        return this._options;
    }

    get(key: string) {
        return this._options[key];
    }
}

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


export class Configure {
    private _options: ConfigInterface;

    constructor() {
        this._options = {
            key: '',
            enabled: true,
            pageTracking: {
                enabled: true
            },
            logging: {
                enabled: false
            }
        };
    }

    options(opts: string | ConfigInterface) {
        if (!opts) return false;
        if (typeof opts === 'string') this._options.key = opts;
        else if (opts) Object.assign(this._options, opts);
        return this._options;
    }

    getOptions() {
        return this._options;
    }

    get(key: string) {
        return this._options[key];
    }
}

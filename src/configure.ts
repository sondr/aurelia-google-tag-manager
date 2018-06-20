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


export class Configure {
    private _options: OptionsInterface;

    constructor() {
        this._options = {
            key: '',
            enabled: true,
            pageTracking: {
                name: 'Page View',
                enabled: true
            },
            logging: {
                enabled: false
            }
        };
    }

    options(opts: string | OptionsInterface) {
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

export interface OptionsInterface {
    key: string;
    enabled: boolean;
    resetDatalayerOnPageChange: boolean;
    trackCurrentPageOnEnable: boolean;
    pageTracking: PropertyOptionsInterface;
    logging: PropertyOptionsInterface;
    [key: string]: string | boolean | PropertyOptionsInterface;
}

export interface PropertyOptionsInterface {
    name?: string;
    enabled?: boolean;
    //toggleEnabled: (value?: boolean) => void
}

export class PropertyOption implements PropertyOptionsInterface {
    public name = '';
    public enabled = false;

    constructor(enable?: boolean, name?: string) {
        this.enabled = enable === true;
        this.name = name || this.name;
    }

    public enable(): void {
        this.enabled = true;
    }

    public disable(): void {
        this.enabled = false;
    }
}


export class Configure {
    private _options: OptionsInterface;

    constructor() {
        this._options = {
            key: '',
            enabled: true,
            resetDatalayerOnPageChange: true,
            trackCurrentPageOnEnable: true,
            pageTracking: new PropertyOption(true, 'PageView'),
            logging: new PropertyOption()
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

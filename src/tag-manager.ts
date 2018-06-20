import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';
import { PLATFORM, DOM } from 'aurelia-pal';
import { Configure, OptionsInterface } from './configure';
import { Disposable } from 'aurelia-binding';


@inject(EventAggregator, Configure)
export class TagManager {
    private _noScriptElement: HTMLElement;
    private _scriptElement: HTMLScriptElement;
    private _subscriptions: { pageTracker?: Disposable } = { pageTracker: undefined };
    private _flags: { scriptsAttached: boolean } = { scriptsAttached: false };
    private _eventAggregator: EventAggregator;
    private _initialized: boolean;
    private _logger: LogManager.Logger;
    private _options: OptionsInterface;
    private _settings: Configure

    public dataLayer: any[];

    constructor(eventAggregator: EventAggregator, configuration: Configure) {
        this._initialized = false;
        this._settings = configuration;
        this._eventAggregator = eventAggregator;
        this._logger = LogManager.getLogger('tag-manager-plugin');
    }

    public init(initData: string | OptionsInterface) {
        let data = this._settings.options(initData);
        this._options = data;

        if (this._checkSettings(data))
            this._setup();
    }

    public enable() {
        this._setup();
        this._options.enabled = true;
    }

    public disable() {
        if (this._subscriptions.pageTracker) this._subscriptions.pageTracker.dispose();
        this._detachScripts();
        this._options.enabled = false;
    }

    public isActive() {
        return this._options.enabled === true;
    }

    private _setup() {
        if (!this._flags.scriptsAttached) this._attachScriptElements(this._options.key);
        if (this._options.pageTracking.enabled === true) this._attachPageTracker();

        this._initialized = true;
    }

    private _checkSettings(opts: OptionsInterface) {
        let valid = true, logtext: string = '', level: LogLevels = 'info';
        if (opts.enabled !== true) {
            logtext = 'tag-manager plugin is disabled';
            valid = false;
        }
        else if (!opts.key || typeof opts.key !== 'string') {
            logtext = 'Missing key parameter for tag-manager plugin';
            valid = false;
            level = 'warn';
        }
        if (opts.logging.enabled) this._log(level, logtext);
        return valid;
    }

    private _attachScriptElements(key: string) {
        const scriptElement = DOM.createElement('script') as HTMLScriptElement;
        scriptElement.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],` +
            `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);` +
            `})(window,document,'script','dataLayer','${key}');`

        const noscriptElement = DOM.createElement('noscript');
        const iframeElement = DOM.createElement('iframe') as HTMLIFrameElement;
        iframeElement.height = '0';
        iframeElement.width = '0';
        iframeElement.style.display = 'none';
        iframeElement.style.visibility = 'hidden';
        iframeElement.src = `https://www.googletagmanager.com/ns.html?id=${key}`;
        noscriptElement.appendChild(iframeElement);

        this._scriptElement = scriptElement;
        this._noScriptElement = noscriptElement;

        if (!this._scriptElement) DOM.querySelector('head').appendChild(this._scriptElement);
        //DOM.querySelector('body').appendChild(noscriptElement);
        if (!this._noScriptElement) {
            const body = DOM.querySelector('body') as HTMLBodyElement;
            body.insertBefore(this._noScriptElement, body.firstChild);
        }

        this._flags.scriptsAttached = true;

        PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
        this.dataLayer = PLATFORM.global.dataLayer;
    }

    private _detachScripts() {
        [this._noScriptElement, this._scriptElement].forEach(el => {
            if (el) {
                const parent = el.parentNode;
                if (parent) parent.removeChild(el);
            }
        });
    }

    private _attachPageTracker() {
        if (this._settings)
            this._subscriptions.pageTracker = this._eventAggregator.subscribe('router:navigation:success', (data: any) => {
                this._trackPage(data.instruction.fragment, data.instruction.config.title);
            });
    }

    private _log(level: LogLevels, message: string) {
        if (!this._options.logging)
            return;

        this._logger[level](message);
    }

    private _trackPage(path: string, title: string) {
        this._log('debug', `Tracking path = ${path}, title = ${title}`);

        if (!this._initialized) {
            this._log('warn', `Tag manager is not initialized`);
            return;
        }

        if (!this.dataLayer) {
            PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
            this.dataLayer = PLATFORM.global.dataLayer;
        }

        this.dataLayer.push({
            'event': this._options.pageTracking.name,
            'url': path
        });
    }
}

type LogLevels = 'debug' | 'error' | 'info' | 'warn';

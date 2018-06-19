import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as LogManager from 'aurelia-logging';
import { PLATFORM, DOM } from 'aurelia-pal';
import { Configure } from './configure';
inject(EventAggregator, Configure);
var TagManager = /** @class */ (function () {
    function TagManager(eventAggregator, configuration) {
        this._initialized = false;
        this._settings = configuration;
        this._eventAggregator = eventAggregator;
        this._logger = LogManager.getLogger('tag-manager-plugin');
    }
    TagManager.prototype._attachPageTracker = function () {
        var _this = this;
        if (this._settings)
            this._eventAggregator.subscribe('router:navigation:success', function (data) {
                _this._trackPage(data.instruction.fragment, data.instruction.config.title);
            });
    };
    TagManager.prototype._log = function (level, message) {
        if (!this._options.logging)
            return;
        this._logger[level](message);
    };
    TagManager.prototype.init = function (initData) {
        var data = this._settings.options(initData);
        if (data === false) {
            this._log('warn', 'Missing parameter for tag-manager plugin..');
            return;
        }
        if (data.enabled !== true)
            return;
        this._options = data;
        this._attachScriptElements(this._options.key);
        if (this._options.pageTracking.enabled === true)
            this._attachPageTracker();
        this._initialized = true;
    };
    TagManager.prototype._attachScriptElements = function (key) {
        var scriptElement = DOM.createElement('script');
        scriptElement.text = '(function (w, d, s, l, i) { console.log(\'Google Tag Manager INIT\'); w[l] = w[l] || []; w[l].push({\'gtm.start\':new Date().getTime(), event: \'gtm.js\'}); var f = d.getElementsByTagName(s)[0],' +
            'j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\'; j.async=true; j.src = \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl; f.parentNode.insertBefore(j, f);' +
            ("})(window, document, 'script', 'dataLayer', '" + key + "');");
        var noscriptElement = DOM.createElement('noscript');
        var iframeElement = DOM.createElement('iframe');
        iframeElement.height = '0';
        iframeElement.width = '0';
        iframeElement.style.display = 'none';
        iframeElement.style.visibility = 'hidden';
        iframeElement.src = "https://www.googletagmanager.com/ns.html?id=" + key;
        noscriptElement.appendChild(iframeElement);
        DOM.querySelector('head').appendChild(scriptElement);
        //DOM.querySelector('body').appendChild(noscriptElement);
        var body = DOM.querySelector('body');
        body.insertBefore(noscriptElement, body.firstChild);
        PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
        this.dataLayer = PLATFORM.global.dataLayer;
    };
    TagManager.prototype._trackPage = function (path, title) {
        this._log('debug', "Tracking path = " + path + ", title = " + title);
        if (!this._initialized) {
            this._log('warn', "Tag manager is not initialized");
            return;
        }
        if (!this.dataLayer) {
            PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
            this.dataLayer = PLATFORM.global.dataLayer;
        }
        this.dataLayer.push({
            'event': 'Pageview',
            'url': path
        });
    };
    return TagManager;
}());
export { TagManager };

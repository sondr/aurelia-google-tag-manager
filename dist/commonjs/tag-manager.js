"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagManager = void 0;
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var LogManager = require("aurelia-logging");
var aurelia_pal_1 = require("aurelia-pal");
var configure_1 = require("./configure");
var TagManager = /** @class */ (function () {
    function TagManager(eventAggregator, configuration) {
        this._subscriptions = { pageTracker: undefined };
        this._flags = { scriptsAttached: false };
        this._initialized = false;
        this._settings = configuration;
        this._eventAggregator = eventAggregator;
        this._logger = LogManager.getLogger('tag-manager-plugin');
    }
    TagManager.prototype.init = function (initData) {
        var data = this._settings.options(initData);
        this._options = data;
        this._setup();
    };
    TagManager.prototype.dispatchDataLayerEvent = function (event) {
        this._ensureDataLayer();
        this._dataLayer.push(event);
    };
    TagManager.prototype.enable = function () {
        this._options.enabled = true;
        this._setup();
        if (this._options.trackCurrentPageOnEnable)
            this._trackPage(aurelia_pal_1.PLATFORM.global.location.pathname, aurelia_pal_1.DOM.title);
    };
    TagManager.prototype.disable = function () {
        this._options.enabled = false;
        if (this._subscriptions.pageTracker)
            this._subscriptions.pageTracker.dispose();
        this._detachScripts();
        if (this._options.logging.enabled)
            this._log('info', 'Tag-Manager disabled');
    };
    TagManager.prototype.isActive = function () {
        return this._options.enabled === true;
    };
    TagManager.prototype.getKey = function () {
        return this._options.key;
    };
    TagManager.prototype._setup = function () {
        if (!this._checkSettings(this._options))
            return;
        if (!this._flags.scriptsAttached)
            this._attachScriptElements(this._options.key);
        if (this._options.pageTracking.enabled === true)
            this._attachPageTracker();
        this._initialized = true;
        if (this._options.logging.enabled)
            this._log('info', 'Tag-Manager started');
    };
    TagManager.prototype._checkSettings = function (opts) {
        var valid = true, logtext = '', level = 'info';
        if (opts.enabled !== true) {
            logtext = 'tag-manager plugin is disabled';
            valid = false;
        }
        else if (!opts.key || typeof opts.key !== 'string') {
            logtext = 'Missing key parameter for tag-manager plugin';
            valid = false;
            level = 'warn';
        }
        if (opts.logging.enabled)
            this._log(level, logtext);
        return valid;
    };
    TagManager.prototype._attachScriptElements = function (key) {
        if (!this._scriptElement) {
            var scriptElement = aurelia_pal_1.DOM.createElement('script');
            scriptElement.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
                "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
                ("})(window,document,'script','dataLayer','" + key + "');");
            this._scriptElement = scriptElement;
            aurelia_pal_1.DOM.querySelector('head').appendChild(this._scriptElement);
        }
        //DOM.querySelector('body').appendChild(noscriptElement);
        if (!this._noScriptElement) {
            var noscriptElement = aurelia_pal_1.DOM.createElement('noscript');
            var iframeElement = aurelia_pal_1.DOM.createElement('iframe');
            iframeElement.height = '0';
            iframeElement.width = '0';
            iframeElement.style.display = 'none';
            iframeElement.style.visibility = 'hidden';
            iframeElement.src = "https://www.googletagmanager.com/ns.html?id=" + key;
            noscriptElement.appendChild(iframeElement);
            this._noScriptElement = noscriptElement;
            var body = aurelia_pal_1.DOM.querySelector('body');
            body.insertBefore(this._noScriptElement, body.firstChild);
        }
        this._flags.scriptsAttached = true;
        // PLATFORM.global.dataLayer = PLATFORM.global.dataLayer || [];
        // this.dataLayer = PLATFORM.global.dataLayer;
        this._ensureDataLayer();
    };
    TagManager.prototype._detachScripts = function () {
        [this._noScriptElement, this._scriptElement].forEach(function (el) {
            if (el) {
                var parent_1 = el.parentNode;
                if (parent_1)
                    parent_1.removeChild(el);
                el = undefined;
            }
        });
    };
    TagManager.prototype._attachPageTracker = function () {
        var _this = this;
        if (this._settings)
            this._subscriptions.pageTracker = this._eventAggregator.subscribe('router:navigation:success', function (data) {
                if (_this._options.resetDatalayerOnPageChange)
                    _this._resetDataLayer();
                _this._trackPage(data.instruction.fragment, data.instruction.config.title);
            });
    };
    TagManager.prototype._resetDataLayer = function () {
        var gtm = aurelia_pal_1.PLATFORM.global.google_tag_manager[this._options.key];
        if (gtm && gtm.dataLayer && typeof gtm.dataLayer.reset === 'function')
            gtm.dataLayer.reset();
    };
    TagManager.prototype._log = function (level, message) {
        if (!this._options.logging)
            return;
        this._logger[level](message);
    };
    TagManager.prototype._trackPage = function (path, title) {
        this._log('debug', "Tracking path = " + path + ", title = " + title);
        if (!this._initialized) {
            this._log('warn', "Tag manager is not initialized");
            return;
        }
        this._ensureDataLayer();
        this._dataLayer.push({
            'event': this._options.pageTracking.name,
            'url': path
        });
    };
    TagManager.prototype._ensureDataLayer = function () {
        if (!this._dataLayer) {
            aurelia_pal_1.PLATFORM.global.dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer || [];
            this._dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer;
        }
    };
    TagManager = __decorate([
        aurelia_dependency_injection_1.inject(aurelia_event_aggregator_1.EventAggregator, configure_1.Configure)
    ], TagManager);
    return TagManager;
}());
exports.TagManager = TagManager;

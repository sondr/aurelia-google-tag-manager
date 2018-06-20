var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-dependency-injection", "aurelia-event-aggregator", "aurelia-logging", "aurelia-pal", "./configure"], function (require, exports, aurelia_dependency_injection_1, aurelia_event_aggregator_1, LogManager, aurelia_pal_1, configure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            if (data.enabled !== true) {
                this._log('info', 'tag-manager plugin is disabled');
                return;
            }
            this._options = data;
            this._attachScriptElements(this._options.key);
            if (this._options.pageTracking.enabled === true)
                this._attachPageTracker();
            this._initialized = true;
        };
        TagManager.prototype._attachScriptElements = function (key) {
            var scriptElement = aurelia_pal_1.DOM.createElement('script');
            scriptElement.text = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
                "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
                ("})(window,document,'script','dataLayer','" + key + "');");
            var noscriptElement = aurelia_pal_1.DOM.createElement('noscript');
            var iframeElement = aurelia_pal_1.DOM.createElement('iframe');
            iframeElement.height = '0';
            iframeElement.width = '0';
            iframeElement.style.display = 'none';
            iframeElement.style.visibility = 'hidden';
            iframeElement.src = "https://www.googletagmanager.com/ns.html?id=" + key;
            noscriptElement.appendChild(iframeElement);
            aurelia_pal_1.DOM.querySelector('head').appendChild(scriptElement);
            //DOM.querySelector('body').appendChild(noscriptElement);
            var body = aurelia_pal_1.DOM.querySelector('body');
            body.insertBefore(noscriptElement, body.firstChild);
            aurelia_pal_1.PLATFORM.global.dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer || [];
            this.dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer;
        };
        TagManager.prototype._trackPage = function (path, title) {
            this._log('debug', "Tracking path = " + path + ", title = " + title);
            if (!this._initialized) {
                this._log('warn', "Tag manager is not initialized");
                return;
            }
            if (!this.dataLayer) {
                aurelia_pal_1.PLATFORM.global.dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer || [];
                this.dataLayer = aurelia_pal_1.PLATFORM.global.dataLayer;
            }
            this.dataLayer.push({
                'event': this._options.pageTracking.name,
                'url': path
            });
        };
        TagManager = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_event_aggregator_1.EventAggregator, configure_1.Configure)
        ], TagManager);
        return TagManager;
    }());
    exports.TagManager = TagManager;
});

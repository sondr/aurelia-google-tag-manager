System.register(["aurelia-dependency-injection", "aurelia-event-aggregator", "aurelia-logging", "aurelia-pal", "./configure"], function (exports_1, context_1) {
    "use strict";
    var aurelia_dependency_injection_1, aurelia_event_aggregator_1, LogManager, aurelia_pal_1, configure_1, TagManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (LogManager_1) {
                LogManager = LogManager_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (configure_1_1) {
                configure_1 = configure_1_1;
            }
        ],
        execute: function () {
            aurelia_dependency_injection_1.inject(aurelia_event_aggregator_1.EventAggregator, configure_1.Configure);
            TagManager = /** @class */ (function () {
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
                    var scriptElement = aurelia_pal_1.DOM.createElement('script');
                    scriptElement.text = '(function (w, d, s, l, i) { console.log(\'Google Tag Manager INIT\'); w[l] = w[l] || []; w[l].push({\'gtm.start\':new Date().getTime(), event: \'gtm.js\'}); var f = d.getElementsByTagName(s)[0],' +
                        'j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\'; j.async=true; j.src = \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl; f.parentNode.insertBefore(j, f);' +
                        ("})(window, document, 'script', 'dataLayer', '" + key + "');");
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
                        'event': 'Pageview',
                        'url': path
                    });
                };
                return TagManager;
            }());
            exports_1("TagManager", TagManager);
        }
    };
});

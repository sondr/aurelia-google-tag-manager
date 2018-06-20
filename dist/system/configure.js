System.register([], function (exports_1, context_1) {
    "use strict";
    var Configure;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Configure = /** @class */ (function () {
                function Configure() {
                    var _this = this;
                    this._options = {
                        key: '',
                        enabled: true,
                        pageTracking: {
                            name: 'PageView',
                            enabled: true,
                            toggleEnabled: function (value) { _this._options.pageTracking.enabled = value || !_this._options.pageTracking.enabled; }
                        },
                        logging: {
                            enabled: false,
                            toggleEnabled: function (value) { _this._options.logging.enabled = value || !_this._options.logging.enabled; }
                        }
                    };
                }
                Configure.prototype.options = function (opts) {
                    if (!opts)
                        this._options.enabled = false;
                    else if (typeof opts === 'string')
                        this._options.key = opts;
                    else
                        Object.assign(this._options, opts);
                    return this._options;
                };
                Configure.prototype.getOptions = function () {
                    return this._options;
                };
                Configure.prototype.get = function (key) {
                    return this._options[key];
                };
                return Configure;
            }());
            exports_1("Configure", Configure);
        }
    };
});

System.register([], function (exports_1, context_1) {
    "use strict";
    var Configure;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Configure = /** @class */ (function () {
                function Configure() {
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
                Configure.prototype.options = function (opts) {
                    if (!opts)
                        return false;
                    if (typeof opts === 'string')
                        this._options.key = opts;
                    else if (opts)
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

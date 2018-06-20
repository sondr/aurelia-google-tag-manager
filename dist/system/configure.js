System.register([], function (exports_1, context_1) {
    "use strict";
    var PropertyOption, Configure;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PropertyOption = /** @class */ (function () {
                function PropertyOption(enable, name) {
                    this.name = '';
                    this.enabled = false;
                    this.enabled = enable === true;
                    this.name = name || this.name;
                }
                PropertyOption.prototype.enable = function () {
                    this.enabled = true;
                };
                PropertyOption.prototype.disable = function () {
                    this.enabled = false;
                };
                return PropertyOption;
            }());
            exports_1("PropertyOption", PropertyOption);
            Configure = /** @class */ (function () {
                function Configure() {
                    this._options = {
                        key: '',
                        enabled: true,
                        resetDatalayerOnPageChange: true,
                        trackCurrentPageOnEnable: true,
                        pageTracking: new PropertyOption(true, 'PageView'),
                        logging: new PropertyOption()
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

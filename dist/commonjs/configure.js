"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Configure = /** @class */ (function () {
    function Configure() {
        this._options = {
            key: '',
            enabled: true,
            pageTracking: {
                name: 'PageView',
                enabled: true
            },
            logging: {
                enabled: false
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
exports.Configure = Configure;

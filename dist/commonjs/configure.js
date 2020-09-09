"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configure = exports.PropertyOption = void 0;
var PropertyOption = /** @class */ (function () {
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
exports.PropertyOption = PropertyOption;
var Configure = /** @class */ (function () {
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
exports.Configure = Configure;

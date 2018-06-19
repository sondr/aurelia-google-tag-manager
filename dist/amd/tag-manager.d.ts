import { EventAggregator } from 'aurelia-event-aggregator';
import { Configure, ConfigInterface } from './configure';
export declare class TagManager {
    private _eventAggregator;
    private _initialized;
    private _logger;
    private _options;
    private _settings;
    dataLayer: any[];
    constructor(eventAggregator: EventAggregator, configuration: Configure);
    private _attachPageTracker;
    private _log;
    init(initData: string | ConfigInterface): void;
    private _attachScriptElements;
    private _trackPage;
}

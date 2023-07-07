"use strict";

var _ = require('underscore');

var ES_REPORTS_DOMAIN = 'STAYON',
    ES_REPORTS_DOMAINKEY = 'www.stayon.com';

class ReportsSearch {
    constructor(defaults) {
        let now = new Date();

        this._es = {};

        this._es['time-stamp'] = now.toISOString();

        this._es.domain = ES_REPORTS_DOMAIN,
        this._es.domainKey = ES_REPORTS_DOMAINKEY,


        this._es.userId = defaults.userid || 'anonymous';
        this._es.mainCategory = 'item_search';
        this._es.eventCategory = defaults.language || '';
        this._es.subCategory = '';
        this._es.locations = {
            lat: Number(defaults.lat) || 0,
            lon: Number(defaults.lon) || 0
        };
        this._es.eventValue = 1;

        this._es.query = defaults.q || '';

    }
    get toJSON() {
        return this._es;
    }
}

module.exports.ReportsSearch = ReportsSearch;
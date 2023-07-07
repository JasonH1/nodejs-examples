"use strict";

var _ = require('underscore');

var sortCdate = {
    "post_date": "desc"
  };

class Items {
 static transform(q, dsl, sortParams) {
    if (q.name) {
      dsl.query.bool.must.push({"term": { "name": q.name }});
    }
    if (q.user) {
      dsl.query.bool.must.push({"term": { "user": q.user }});
    }
    if (q.status) {
      dsl.query.bool.must.push({"term": { "status": q.status }});
    }

    if (!q.sort) q.sort = "post_date";

    sortParams = q.sort.split(",");
    
    dsl.sort = [];

    for (var i = 0;i<sortParams.length;i++) {
      switch(sortParams[i]) {
        case 'post_date':
            dsl.sort.push(sortCdate);
            break;
      }
    }

    return sortParams;
 }
}

module.exports = Items;

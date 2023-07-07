# SIK Search API

### Elasticsearch

In order to use Elasticsearch (ES) functions you need to have ES running locally or remotely. You can download ES [here](https://www.elastic.co/downloads/elasticsearch). You will also need to have Java Runtime Environment installed and `JAVA_HOME` environment variable pointing to directory with JRE (e.g. `C:\Program Files\Java\jre1.8.0_20`).

Then you can go to ES directory and run `bin\elasticsearch.bat` (Windows) or `bin/elasticsearch` (Unix).

By default ES API is available on `http://localhost:9200`. For `dev` ES base url is specified in [settings](https://github.com/JasonH1/ernr-search/blob/master/settings.js), but you can override it with `ELASTICSEARCH_BASE_URL` environment variable. `prod` version will work only with `ELASTICSEARCH_BASE_URL` environment variable.

You can also set 2 additional parameters if your Elasticsearch server requires authentication: `ELASTICSEARCH_USERNAME` and `ELASTICSEARCH_PASSWORD`.

You can make queries directly to ES cluster.

E.g. if you are running ES locally, you can send POST-request to `http://localhost:9200/shops/shop/_search` with next body:

```
{
  "query": {
    "match": {
      "title": "your query"
    }
  },
  "from": 0,
  "size": 20
}
```

Or if you want to make wildcard query:

```
{
  "query": {
    "wildcard": {
      "title": "te*"
    }
  },
  "from": 0,
  "size": 20
}
```

`from` and `size` parameters are used for search results pagination. 


### Environment variables

Server settings: `SERVER_NAME` (default: `localhost`), `PORT` (default: `8085`)

System settings: `JWT_TOKEN_SECRET` (default: `siklocal`)

Environment settings: `PROD` (set this variable to work with `prod` environment)

Redis settings (for `prod` only): `REDIS_IP`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_METADATA_IP`, `REDIS_METADATA_PORT`, `REDIS_METADATA_PASSWORD`

ElasticSearch settings (required for `prod`, optional for `dev`): `ELASTICSEARCH_BASE_URL`, `ELASTICSEARCH_USERNAME` (optional), `ELASTICSEARCH_PASSWORD` (optional)


### Images

File storage base URL: `http://img.sab247.com`

When you upload image file using <a href="https://github.com/JasonH1/sik-upload" target="_blank">SIK Upload API</a>, you get relative url-key in next format:

`<env>/<hash>`

For example, if you upload file to `dev` storage you can get url like this:

`dev/0M9b6P`

Knowing this, you can get:

1. Original image: `<File storage base URL>/<env>/<hash>`

   `https://img.sab247.com/dev/0M9b6P`

2. Mobile image (`1000`x`1000`): `<File storage base URL>/<env>/<hash>/mobile`

   `https://img.sab247.com/dev/0M9b6P/mobile`

3. Medium thumbnail (`480`x`480`): `<File storage base URL>/<env>/<hash>/m`

   `https://img.sab247.com/dev/0M9b6P/m`

4. Grid thumbnail (`360`x`360`): `<File storage base URL>/<env>/<hash>/g`

   `https://img.sab247.com/dev/0M9b6P/g`

5. Small thumbnail (`240`x`240`): `<File storage base URL>/<env>/<hash>/s`

   `https://img.sab247.com/dev/0M9b6P/s`

6. Extra small thumbnail (`120`x`120`): `<File storage base URL>/<env>/<hash>/xs`

   `https://img.sab247.com/dev/0M9b6P/xs`


### Utils

Usage:

`grunt utils --target=utilityName [--env=dev|prod] [--args="arg1=argValue"]`

To get list of available utilities run `grunt utils`.

In order to add new utility you will need to put it into `utils` folder in the root folder of the project, and then add it to `utils` array in [utils/index.js](utils/index.js).

Example of simple utility:

```javascript
'use strict';

var constants = require('../app/constants')(),
  db = require('../app/db')(),
  ProgressBar = require('progress');
  
exports = module.exports = function(options, callback) {
  // options should be passed using `args`
  // callback(err, response);
};
```

By default utilities will be started under `test` environment. To start specific utility under `dev` environment, run it using:

`grunt utils --target=utilityName --env=dev`

Same for `prod`. But for `prod` you also need to specify all essential environment variables. E.g. like this:

```bash
export REDIS_IP=''
export REDIS_PORT=''
export REDIS_PASSWORD=''
export REDIS_METADATA_IP=''
export REDIS_METADATA_PORT=''
export REDIS_METADATA_PASSWORD=''
export ELASTICSEARCH_BASE_URL=''
export ELASTICSEARCH_USERNAME=''
export ELASTICSEARCH_PASSWORD=''
```

var riot    = require('riot');
var convert = require('./lib/convert');
require('./components/app.tag');
require('./components/item.tag');

// JSONP callback
bootstrap = function(data) {
  riot.mount('app', {
    items: convert(data)
  });
};

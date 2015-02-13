var riot = require('riot');
require('./components/app.tag');
require('./components/item.tag');

convert = function(data) {
  var currencies = []
  for (var i = 0; i < data.list.resources.length; i++) {
    var f = data.list.resources[i].resource.fields
    var re = /^USD\//
    if (re.test(f.name)){
      currencies.push({ title: f.name.replace(re, ''), price: f.price });
    }
  }
  return currencies;
};

// JSONP callback
bootstrap = function(data) {
  riot.mount('app', {
    items: convert(data)
  });
};

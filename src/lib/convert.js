// Convert data format from Yahoo! into simple form
// http://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json

module.exports = function(data) {
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
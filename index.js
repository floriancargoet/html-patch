var fs = require('fs');
var jsdom = require('jsdom');
var xml = require('libxmljs');

var Rule = require('./Rule');

var inputFile = fs.readFileSync('examples/simple-rules.html', 'utf8');
var rulesFile = fs.readFileSync('examples/simple-rules.xml', 'utf8');

var rules = xml.parseXml(rulesFile).find('/rules/*').map(Rule.fromXml);

console.log(inputFile);

jsdom.env(inputFile, function (errors, window) {
  rules.forEach(function (rule) {
    rule.apply(window.document);
  });
  var html = toHTML(window.document);
  console.log(html);
});

function toHTML(doc) {
  var html = '';

  if (doc.doctype) {
    html += String(doc.doctype);
  }
  html += doc.innerHTML;
  return html;
}

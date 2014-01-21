var fs       = require('fs');
var jsdom    = require('jsdom');
var xml      = require('libxmljs');
var optimist = require('optimist');

var Rule = require('./Rule');

var argv = optimist
  .string('input')
  .string('rules')
  .argv;

var inputFile = fs.readFileSync(argv.input, 'utf8');
var rulesFile = fs.readFileSync(argv.rules, 'utf8');

var rules = xml.parseXml(rulesFile).find('/rules/*').map(Rule.fromXml);

console.log('Before');
console.log('------');
console.log(inputFile);

jsdom.env(inputFile, function (errors, window) {
  rules.forEach(function (rule) {
    rule.apply(window.document);
  });
  var html = toHTML(window.document);
  console.log('After');
  console.log('-----');
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


var Rule = module.exports = function Rule(command, selector, body) {
  this.command = command;
  this.selector = selector;
  this.body = body;
};

Rule.prototype.apply = function apply(document) {
  var self = this;
  if (this.command in this) {
    Array.prototype.forEach.call(document.querySelectorAll(this.selector), function (node) {
      self[self.command](node, document);
    });
  }
};

Rule.prototype.remove = function remove(node, document) {
  node.parentNode.removeChild(node);
};

Rule.prototype.append = function append(node, document) {
  var container = document.createElement('div');
  container.innerHTML = this.body;
  var children = container.childNodes;
  while (children.length) {
    node.appendChild(children[0]);
  }
};

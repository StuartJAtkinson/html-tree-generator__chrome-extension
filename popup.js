window.onload = onWindowLoad;

/**
*	Listen for a message in order to know when to build the tree.
*/
document.addEventListener('DOMContentLoaded', function() {
  // Build the tree.
  document.getElementById('tree').innerHTML = buildTree(scanPage());
  // Add mouseover listener to each node label.
  var nodes = document.getElementsByClassName('node');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener('mouseover', hoverAction);
  }
});

/**
*	Load the tree script on window load.
*/
function onWindowLoad() {
  // No need to execute script, just call scanPage directly
  scanPage();
}

/**
*	Update the info in the details panel to match the node that was last hovered.
*/
function hoverAction() {
  document.getElementById('tagName').innerHTML = this.getAttribute('data-tag');
  document.getElementById('nodeId').innerHTML = this.getAttribute('data-id');
  document.getElementById('childrenCount').innerHTML = this.getAttribute('data-childcount');
}

/**
*	Builds the tree diagram that may be added to the dom.
*/
function buildTree(root) {
  return '<ul>' + _buildNode(root) + '</ul>';

  function _buildNode(node) {
    var nodeString = '<li>';
    nodeString += '<a class="node" data-tag="' + node.tag + '" data-childcount=' + node.children.length + ' data-id="' + node.id + '">' + node.tag + '</a>';
    
    // Add attributes as a tooltip or in a details section
    if (node.attributes.length > 0) {
      nodeString += '<div class="attributes">';
      node.attributes.forEach(attr => {
        nodeString += '<span>' + attr.name + ': ' + attr.value + '</span><br>';
      });
      nodeString += '</div>';
    }

    // Add the children as a sublist if any.
    if (node.children.length > 0) {
      nodeString += '<ul>';
      for (var i = 0; i < node.children.length; i++) {
        nodeString += _buildNode(node.children[i]);
      }
      nodeString += '</ul>';
    }
    nodeString += '</li>';
    return nodeString;
  }
}
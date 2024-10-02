document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    const iframe = document.getElementById('contentFrame');
    iframe.src = url;
    iframe.style.display = 'block';
    document.getElementById('generateTree').style.display = 'block';
  });

  document.getElementById('generateTree').addEventListener('click', function() {
    const iframe = document.getElementById('contentFrame');
    scanPageInIframe(iframe);
  });
  
  
  function scanPageInIframe(iframe) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const tree = buildTree(scanPage(iframeDocument));
    document.getElementById('tree').innerHTML = tree;
    addHoverListeners();
  }
  
  function scanPage(document) {
    return _scanElement(document.documentElement);
  
    function _scanElement(domElement) {
      var id = domElement.id;
      var classes = domElement.classList;
      var tagName = domElement.tagName;
      var attributes = Array.from(domElement.attributes).map(attr => ({ name: attr.name, value: attr.value }));
      var children = domElement.children;
      var scannedChildren = [];
      for (var i = 0; i < children.length; i++) {
        scannedChildren.push(_scanElement(children[i]));
      }
      return {
        tag: tagName,
        id: id,
        classes: classes,
        attributes: attributes,
        children: scannedChildren
      };
    }
  }
  
  function buildTree(root) {
    return '<ul>' + _buildNode(root) + '</ul>';
  
    function _buildNode(node) {
      var nodeString = '<li>';
      nodeString += '<a class="node" data-tag="' + node.tag + '" data-childcount=' + node.children.length + ' data-id="' + node.id + '">' + node.tag + '</a>';
      
      if (node.attributes.length > 0) {
        nodeString += '<div class="attributes">';
        node.attributes.forEach(attr => {
          nodeString += '<span>' + attr.name + ': ' + attr.value + '</span><br>';
        });
        nodeString += '</div>';
      }
  
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
  
  function addHoverListeners() {
    var nodes = document.getElementsByClassName('node');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener('mouseover', hoverAction);
    }
  }
  
  function hoverAction() {
    document.getElementById('tagName').innerHTML = this.getAttribute('data-tag');
    document.getElementById('nodeId').innerHTML = this.getAttribute('data-id');
    document.getElementById('childrenCount').innerHTML = this.getAttribute('data-childcount');
  }
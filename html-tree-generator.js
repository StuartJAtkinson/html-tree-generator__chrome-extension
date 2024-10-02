document.addEventListener('DOMContentLoaded', function() {
	scanPage();
  });
  
  /**
  *	Grabs the root dom element and builds a tree object that may be displayed in the popup.
  */
  function scanPage() {
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
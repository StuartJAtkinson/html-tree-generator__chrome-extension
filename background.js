chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.create({
        url: 'popup.html',
        type: 'popup',
        width: 800,
        height: 600
    });
});
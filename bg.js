chrome.runtime.setUninstallURL("https://thebyteseffect.com/posts/feedback-qrcode/", null);// No i18n
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        chrome.tabs.create({ url: "https://thebyteseffect.com/posts/qrcodegen/" });
    }

});

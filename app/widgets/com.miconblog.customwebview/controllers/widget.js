function handleGoBack(e) {
    if ($.webview.canGoBack()) {
        $.webview.evalJS("history.back()");
    }
}

function handleGoForward() {
    if ($.webview.canGoForward()) {
        $.webview.evalJS("history.forward()");
    }
}

function handleGoHome() {
    $.webview.setUrl("http://tidev.kr/");
}

function handleRefresh() {
    $.webview.reload();
}
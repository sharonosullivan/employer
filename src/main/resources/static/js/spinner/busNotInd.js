var busyIndicator = function () {

    var show = function () {
        getBusyOverlay("viewport", { color: 'black', opacity: 0.25 }, { type: 'oval', size: 50 });
    }
    var hide = function () {
        getBusyOverlay("viewport", { color: 'black', opacity: 0.25 }, { type: 'oval', size: 50 }).remove();
    }

    return {
        Hide: hide,
        Show: show
    };
}
var showMessage = function (text, resultType) {
    
    if (!resultType && text.responseText) {
        var errorMessage = JSON.parse(text.responseText).Message;
        text = errorMessage;
    }
    if (resultType) {
        $("body").overHang({
            activity: "notification",
            duration: 2,
            message: "Success! (" + text + ")",
            col: "emerald"
        });

    } else {
        $("body").overHang({
            activity: "notification",
            duration: 2,
            message: "Failed! (" + text + ")",
            col: "alizarin"
        });
    }

}
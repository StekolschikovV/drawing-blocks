var position = {


    e: 0,
    tempX: 0,
    tempY: 0,
    startX: 0,
    startY: 0,
    stopX: 0,
    stopY: 0,
    minX: 50,
    minY: 50,
    ClickTempBlockStatus: false,
    FreeSpace: true,
    FreeSpaceConform: true,



    Start: function () {
        window.onmousemove = function (e) {
            position.e = position;
            e.toElement.id == "board" ? position.FreeSpace = true : position.FreeSpace = false;
            position.tempX = e.pageX;
            position.tempY = e.pageY;
            position.ChangePositionCursor();
            position.ChangePositionStopCursor();
            position.ClickTempBlockMove();
        }
    },
    SetStart: function (X, Y) {
        position.FreeSpaceConform = position.FreeSpace;
        if (position.FreeSpaceConform) {
            this.startX = this.tempX;
            this.startY = this.tempY;
            position.ClickStartPositionStart();
            position.ShowStopCursor();
            position.ClickTempBlockStart();
            position.ClickTempBlockStatus = true;
        }
    },
    SetStop: function (X, Y) {
        if (position.FreeSpaceConform) {
            position.stopX = position.tempX;
            position.stopY = position.tempY;
            position.PaintingBlock();
            position.ClickStartPositionStop();
            position.ChangePositionStopStopCursor();
            position.ClickTempBlockStop();
            position.DelDotEl();
            position.ClickTempBlockStatus = false;
            position.resizableAndDraggable();
            position.SetZIndexToAddEl();
        }
    },
    PaintingBlock: function () {
        var w = Math.abs(position.tempX - position.startX);
        var h = Math.abs(position.tempY - position.startY);
        $("#board").append("<div onclick='position.SetZIndex(this)' style='height: " + h + "px; width: " + w + "px; top:" + (position.startY < position.stopY ? position.startY : position.stopY) + "px; left:" + (position.startX < position.stopX ? position.startX : position.stopX) + "px'></div>");
    },
    ChangePositionCursor: function () {
        $("#cursor").css({ top: position.tempY, left: position.tempX });
    },
    ShowStopCursor: function () {
        $("#click-position-stop").css({ display: "block" });
    },
    ChangePositionStopCursor: function () {
        $("#click-position-stop").css({ top: position.tempY - 10, left: position.tempX - 10 });
    },
    ClickStartPositionStart: function () {
        $("#click-position-start").css({ top: position.tempY - 10, left: position.tempX - 10, display: "block" });
    },
    ClickStartPositionStop: function () {
        $("#click-position-start").css({ display: "none" });
    },
    ChangePositionStopStopCursor: function () {
        $("#click-position-stop").css({ display: "none" });
    },
    // ClickTempBlock
    ClickTempBlockStart: function () {
        $("#click-temp-block").css({ top: position.tempY, left: position.tempX, display: "block", height: 0, width: 0 });
        position.ClickTempBlockStatus = true;
    },
    ClickTempBlockStop: function () {
        $("#click-temp-block").css({ top: position.tempY, left: position.tempX, display: "none" });
    },
    ClickTempBlockMove: function () {
        if (position.ClickTempBlockStatus == true) {
            var w = Math.abs(position.tempX - position.startX);
            var wTrue = position.tempX - position.startX;
            var h = Math.abs(position.tempY - position.startY);
            var hTrue = position.tempY - position.startY;
            var x = (w == wTrue ? position.startX : position.tempX);
            var y = (h == hTrue ? position.startY : position.tempY);
            $("#click-temp-block").css({ height: h, width: w, top: y, left: x });
            if (position.tempX - position.startX < position.minX && position.startX - position.tempX < position.minX || position.tempY - position.startY < position.minY && position.startY - position.tempY < position.minY) {
                $("#click-temp-block").css({ "background-color": "red" });
            } else {
                $("#click-temp-block").css({ "background-color": "#f5d79b" });
            }
        }
    },
    // ClickTempBlock
    // DelDotEl
    DelDotEl: function () {
        if (position.stopX - position.startX < position.minX && position.startX - position.stopX < position.minX || position.stopY - position.startY < position.minY && position.startY - position.stopY < position.minY) {
            $("#board div:last").remove();
        }
    },
    // DelDotEl
    // resizableAndDraggable
    resizableAndDraggable: function () {
        $("#board div").last().resizable({
            handles: 'n, e, s, w'
        });
        $("#board div").draggable();
    },
    // resizableAndDraggable
    SetZIndex: function (e) {
        $("#board div").each(function (i, elem) {
            $(elem).css({ "z-index": "998" });
        });
        $(e).css({ "z-index": "999" });
    },
    SetZIndexToAddEl: function (e) {
        $("#board div").each(function (i, elem) {
            $(elem).css({ "z-index": "998" });
        });
        $("#board div:last").css({ "z-index": "999" });
    }

}
$(document).ready(function () {
    position.Start();
});

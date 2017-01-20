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
    FreeSpace: false,
    FreeSpaceConform: false,
    ShowMenu: false,
    area: 0,



    Start: function () {
        window.onmousemove = function (e) {
            position.e = position;
            e.toElement.id == "board" ? position.FreeSpace = true : position.FreeSpace = false;
            position.tempX = e.pageX;
            position.tempY = e.pageY;
            // position.ChangePositionCursor();
            position.ChangePositionStopCursor();
            position.ClickTempBlockMove();
        }
        $('*').bind('contextmenu', function (e) {
            return false;
        });
        $('*').click(function () {
            if (position.ShowMenu == true) {
                $("#click-menu").css({ top: "-500", left: "-500", display: "none" });
                position.ShowMenu = false;
            }

        });
    },
    SetStart: function (event) {
        if (event.buttons == 1) {
            position.FreeSpaceConform = position.FreeSpace;
            if (position.FreeSpaceConform) {
                position.startX = position.tempX;
                position.startY = position.tempY;
                position.ClickStartPositionStart();
                position.ShowStopCursor();
                position.ClickTempBlockStart();
                position.ClickTempBlockStatus = true;
            }
        } else {
            position.SetMenuPosition(event);
        }

    },
    SetStop: function (event) {

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
            position.GetArea(Math.abs(position.stopX - position.startX) * Math.abs(position.stopY - position.startY));
            position.SetArea();
        }

    },
    PaintingBlock: function () {
        var w = Math.abs(position.tempX - position.startX);
        var h = Math.abs(position.tempY - position.startY);
        $("#board").append("<div onclick='position.SetZIndex(this)' style='height: " + h + "px; width: " + w + "px; top:" + (position.startY < position.stopY ? position.startY : position.stopY) + "px; left:" + (position.startX < position.stopX ? position.startX : position.stopX) + "px'></div>");
    },
    // ChangePositionCursor: function () {
    //     $("#cursor").css({ top: position.tempY, left: position.tempX });
    // },
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
    },
    // Area 
    
    GetArea: function (area) {
        position.area += area;
    },
    SetArea: function () {
        document.getElementById("area").innerHTML = position.area;
    },
    // Area
    SetMenuPosition: function (event) {
        $("#click-menu").css({ top: event.pageY, left: event.pageX, display: 'block' });
        position.ShowMenu = true;
    }
}
$(document).ready(function () {
    position.Start();
});

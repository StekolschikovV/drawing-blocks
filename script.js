var position = {


    tempX: 0,
    tempY: 0,
    startX: 0,
    startY: 0,
    stopX: 0,
    stopY: 0,


    Start: function () {
        window.onmousemove = function (e) {
            position.tempX = e.pageX;
            position.tempY = e.pageY;
            position.ChangePosition();
        }
    },
    SetStart: function (X, Y) {
        this.startX = this.tempX;
        this.startY = this.tempY;
    },
    SetStop: function (X, Y) {
        position.stopX = position.tempX;
        position.stopY = position.tempY;
        var w = Math.abs(position.tempX - position.startX);
        var h = Math.abs(position.tempY - position.startY);
        $("#board").append("<div style='height: " + h + "px; width: " + w + "px; top:" +  (position.startY < position.stopY ? position.startY : position.stopY)  + "px; left:" + (position.startX < position.stopX ? position.startX : position.stopX) + "px'></div>");
    },
    ChangePosition: function () {
        $("#cursor").css({top: position.tempY, left: position.tempX});
    }
}

$(document).ready(function () {
    position.Start();
});



/**
 * Created by songchao on 16/6/25.
 */

//-----获取响应元素
var canvas = document.getElementById("workload_canvas");
$(canvas).attr({width: $(canvas).width() + "px", height: $(canvas).height() + "px"});
var toast = document.getElementById("workload_toast");
//-----数据配置存储类
var Workload = {
    Data: [200, 300, 400, 500, 600, 700, 100, 200, 300, 500, 400, 0],
    type: 0,
    year: undefined,
    month: undefined,
    day: undefined,
    mouseEvent: [],

    width: $(canvas).width(),
    height: $(canvas).height(),
    offsetLeft: 40,
    offsetTop: 40,
    offsetRight: 40,
    offsetBottom: 40,
    arrowLength: 5,
    limitY: function () {
        var dd = this.Data;
        return Math.max.apply(null, dd);
    },
    unitLengthX: undefined,
    unitLengthY: function () {
        return (this.getYLength() - 40) / this.limitY();
    },
    getX: function (x) {
        return x + this.offsetLeft;
    },
    getY: function (y) {
        return this.height - this.offsetBottom - y;
    },
    getXLength: function () {
        return this.width - this.offsetLeft - this.offsetRight;
    },
    getYLength: function () {
        return this.height - this.offsetTop - this.offsetBottom;
    },
    drawLine: function (context, x1, y1, x2, y2) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    },
    setXLimit: function (day) {
        this.day = this.Data.length;
        switch (this.type) {
            case 0:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 24;
                break;
            case 1:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 60;
                break;
            case 2:
                if (day != undefined) {
                    Workload.unitLengthX = (Workload.getXLength() - 40) / (2 * day);
                }
                break;
        }
    },
};

function showWorkload(employeeID) {
    //通过网络获取数据
    var url = "/getWork/employeeId/{employeeId}/starttime/{starttime}/days/{days}";
    Tools.myAjax({
        type:get,
        
    })
}

/*draw(canvas);*/


//type,0,代表年,1代表月,2代表日
//开始绘画
function draw(canvas) {
    var context = canvas.getContext("2d");
    context.font = "10px Georgia";

    lineXY(context);
    drawCloseButton(context);
    Workload.setXLimit();
    drawPic(context);
}

function drawCloseButton(context){
    var image = new Image();
    image.src = "../images/index/close.png";
    var imagex = Workload.width -37;
    var imagey = 5;
    if(image.complete){
        context.drawImage(image,imagex,imagey);
    }else {
        image.onload = function () {
            context.drawImage(image,imagex,imagey);
        }
    }
}

//循环每一个矩形
function drawPic(context) {
    for (var i = 0; i < Workload.day; i++) {
        aniH(context, i, 0);
    }
    open();
}

//动画实现
function aniH(context, i, hh) {
    var geadd = Workload.limitY()/2500;
    var getime = 10;
    var time = setInterval(function () {
        createRect(context, Workload.getX(Workload.unitLengthX * (i * 2 + 1)), Workload.unitLengthX, hh += getime*geadd, i);
        if (hh >= Workload.Data[i]) {
            window.clearInterval(time);
        }
    }, 10);
}


//画出xy轴
function lineXY(context) {
    //画x,y轴
    context.beginPath();
    Workload.drawLine(context, Workload.getX(0), Workload.getY(0), Workload.getX(0), Workload.getY(Workload.getYLength()));
    Workload.drawLine(context, Workload.getX(0), Workload.getY(Workload.getYLength()), Workload.getX(0) - Workload.arrowLength, Workload.getY(Workload.getYLength()) + Workload.arrowLength);
    Workload.drawLine(context, Workload.getX(0), Workload.getY(Workload.getYLength()), Workload.getX(0) + Workload.arrowLength, Workload.getY(Workload.getYLength()) + Workload.arrowLength);
    context.fillText("工作量", Workload.getX(0), Workload.getY(Workload.getYLength()) - 5);
    context.stroke();

    Workload.drawLine(context, Workload.getX(0), Workload.getY(0), Workload.getX(Workload.getXLength()), Workload.getY(0));
    Workload.drawLine(context, Workload.getX(Workload.getXLength()), Workload.getY(0), Workload.getX(Workload.getXLength()) - Workload.arrowLength, Workload.getY(0) - Workload.arrowLength);
    Workload.drawLine(context, Workload.getX(Workload.getXLength()), Workload.getY(0), Workload.getX(Workload.getXLength()) - Workload.arrowLength, Workload.getY(0) + Workload.arrowLength);
    context.fillText("时间", Workload.getX(Workload.getXLength()) - 20, Workload.getY(0) - 20);
    context.stroke();
}

//创建矩形类,同时添加鼠标响应事件,同时把事件响应注册到数组里
function createRect(context, x, width, height, whichDay) {
    var o = new Object();
    o.x = x;
    o.width = width;
    o.height = height;
    o.whichDay = whichDay;
    o.mouseMove = function (e) {
        switch (Workload.type) {
            case 0:
                toast.innerHTML = this.whichDay + "月:" + Workload.Data[this.whichDay] + "件";
                break;
            case 1:
                toast.innerHTML = this.whichDay + "日:" + Workload.Data[this.whichDay] + "件";
                break;
            case 2:
                toast.innerHTML = this.whichDay + "日:" + Workload.Data[this.whichDay] + "件";
                break;
        }
        toast.style.display = "block";
        toast.style.left = e.x + 20 + "px";
        toast.style.top = e.y + 20 + "px";
    };

    //每创建一个矩形就把它画出来
    var y = height * Workload.unitLengthY();
    o.y = Workload.getY(0) - y;
    context.fillStyle = "#42b983";
    context.fillRect(x, o.y, width, y);
    Workload.mouseEvent.push(o);
}
//添加事件到DOM上面
canvas.addEventListener("mousemove", function (e) {
    var onRect = false;
    //循环判断在哪个矩形上面
    for (var i = 0; i < Workload.mouseEvent.length; i++) {
        var x = e.clientX - e.target.offsetLeft;
        var y = e.clientY - e.target.offsetTop;
        var oo = Workload.mouseEvent[i];
        if (x >= oo.x && x <= oo.x + oo.width && y >= oo.y && y <= Workload.getY(0)) {
            oo.mouseMove(e);
            onRect = true;
        }
    }
    //如果鼠标不在任何一个矩形上面,那么让显示块消失
    if (!onRect) {
        toast.innerHTML = "";
        toast.style.display = "none";
    }
});
canvas.addEventListener("click",function (e) {
    //如果点击范围在关闭按钮上,那么关闭
    if(e.clientX-e.target.offsetLeft >= Workload.width - 37 && e.clientY-e.target.offsetTop <= 37){
        close();
    }
});

function close() {
    $(canvas).attr("class","workload_canvas");
}

function open() {
    $(canvas).attr("class","workload_canvas_on workload_canvas");
}
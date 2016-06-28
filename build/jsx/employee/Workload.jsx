/**
 * Created by songchao on 16/6/25.
 */

/**
 * 入口方法,调用显示工作量
 * @param employeeID
 */
function showWorkload(packageID) {
    if (packageID != undefined) {
        Workload.id = packageID;
        Workload.whichRequest = 1;
    }
    $(canvas).attr({width: $(canvas).width() + "px", height: $(canvas).height() + "px"});
    setTimeout(function () {
        ReactDOM.render(<WorkloadInputComponent />,
            document.getElementById("workload_input_container"))
    }, 1000);
    draw(canvas);
}

//-----获取响应元素
var canvas = document.getElementById("workload_canvas");
var toast = document.getElementById("workload_toast");
//-----数据配置存储类
var Workload = {
    Data: [],//数据
    type: 0,//类型,包括1,年,2,月,3,日,4自定义日期
    year: undefined,//年
    month: undefined,//月
    day: undefined,//存放当前选择日期
    days: undefined,//存放当前需要向服务器请求的日期数
    rectNum: 0,//存放需要在图上绘制的矩形个数
    mouseEvent: [],//时间绑定到这里

    id: User.id,//请求的id,默认是用户的id
    whichRequest: 0,//那个组织的工足量?0,默认,个人工作量,1,营业网点工作量

    width: function () {
        return $(canvas).width();
    },
    height: function () {
        return $(canvas).height();
    },
    offsetLeft: 40,
    offsetTop: 40,
    offsetRight: 40,
    offsetBottom: 40,
    arrowLength: 5,
    limitY: 0,
    unitLengthX: undefined,
    unitLengthY: function () {
        return (this.getYLength() - 40) / this.limitY;
    },
    getRectMaxH: function () {
        return this.getYLength() - 40;
    },
    getX: function (x) {
        return x + this.offsetLeft;
    },
    getY: function (y) {
        return this.height() - this.offsetBottom - y;
    },
    getXLength: function () {
        return this.width() - this.offsetLeft - this.offsetRight;
    },
    getYLength: function () {
        return this.height() - this.offsetTop - this.offsetBottom;
    },
    drawLine: function (context, x1, y1, x2, y2) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    },
    setXLimit: function () {
        //this.rectNum = this.Data.length;
        switch (this.type) {
            case 0:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 24;
                break;
            case 1:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 62;
                break;
            case 2:
                Workload.unitLengthX = (Workload.getXLength() - 40) / 48;
                break;
            case 3:
                if (this.rectNum != undefined) {
                    Workload.unitLengthX = (Workload.getXLength() - 40) / (2 * this.rectNum);
                }
                break;
        }
    },
    init: function () {
        this.mouseEvent.length = 0;
        this.setXLimit();
        this.type = parseInt(this.type);
        this.year = parseInt(this.year);
        this.month = parseInt(this.month);
        this.day = parseInt(this.day);
        this.days = parseInt(this.days);
        this.rectNum = parseInt(this.rectNum);

        var dd = this.Data;
        this.limitY = Math.max.apply(null, dd);
    }
};

/**
 * 工作量容器
 */
var WorkloadInputComponent = React.createClass({
    getInitialState: function () {
        return {
            year: "2010",
            month: "1",
            day: "1",
            toDay: "",
        }
    },
    yearChange: function (e) {
        var value = e.target.value;
        this.setState({year: value});
        loadData(0, value);
    },
    monthChange: function (e) {
        var value = e.target.value;
        this.setState({month: value});
        loadData(1, this.state.year, value);
    },
    dayChange: function (e) {
        var value = e.target.value;
        this.setState({day: value});
        loadData(2, this.state.year, this.state.month, value);
    },
    inputBlur: function (e) {
        var value = e.target.value;
        if (value != "") {
            this.setState({toDay: value});
            loadData(3, this.state.year, this.state.month, this.state.day, value);
        }
    },
    render: function () {
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var year = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
        var day = [];
        for (var i = 1; i <= 30; i++) {
            day.push(i);
        }
        return (
            <div>
                <select onChange={this.yearChange} className="form-control">
                    {
                        year.map(function (data, index) {
                            return <option key={"option"+index} value={data}>{data}</option>
                        })
                    }
                </select>
                <select onChange={this.monthChange} className="form-control">
                    {
                        month.map(function (data, index) {
                            return <option key={"option"+index} value={data}>{data}</option>
                        })
                    }
                </select>
                <select onChange={this.dayChange} className="form-control">
                    {
                        day.map(function (data, index) {
                            return <option key={"option"+index} value={data}>{data}</option>
                        })
                    }
                </select>
                <input onBlur={this.inputBlur} type="number" className="form-control"/>
            </div>
        );
    }
});

function loadData(type, year, month, day, toDay) {
    //type 1,year,2month,3day,4today
    //初始化workload类中的参数
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var fromTime = "";
    var days = 0;
    switch (type) {
        case 0:
            Workload.year = year;
            fromTime = year + "-01-01";
            Workload.days = 365;
            Workload.rectNum = 12;
            break;
        case 1:
            Workload.month = month;
            fromTime = year + "-" + month + "-01";
            Workload.days = 31;
            Workload.rectNum = 31;
            break;
        case 2:
            Workload.day = day;
            fromTime = year + "-" + month + "-" + day;
            Workload.days = 1;
            Workload.rectNum = 24;
            break;
        case 3:
            Workload.days = toDay;
            Workload.rectNum = toDay;
            fromTime = year + "-" + month + "-" + day;
            break;
    }

    var url = "";
    if (Workload.whichRequest == 0) {//0是个人工作量
        url = "/REST/Domain/getWork/employeeId/" + Workload.id + "/starttime/" + fromTime + "/days/" + Workload.days;
    } else if (Workload.whichRequest == 1) {//1是网点工作量
        url = "/REST/Domain/getWorkOfOutlets/outletId/" + Workload.id + "/starttime/" + fromTime + "/days/" + Workload.days;
    }

    
    Tools.myAjax({
        type: "get",
        url: url,
        success: function (data) {
            //通过时间区分工作量
            handleData(data, type);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "获取工作量错误fromtime:" + fromTime + "day:" + Workload.days, true);
        }
    });
}

function handleData(data, type) {
    var load = [];
    var i = 0;
    if (type == 0) {
        //统计一年中每个月的工作量
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var month = new Date(dd.outTime).getMonth() + 1;
            if (load[month] == undefined) {
                load[month] = 1;
            } else {
                load[month]++;
            }
        }
    } else if (type == 1) {//月
        //统计一年中每个月的工作量
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var day = new Date(dd.outTime).getDate();
            if (load[day] == undefined) {
                load[day] = 1;
            } else {
                load[day]++;
            }
        }
    } else if (type == 2) {//日
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var hour = new Date(dd.outTime).getHours();
            if (load[hour] == undefined) {
                load[hour] = 1;
            } else {
                load[hour]++;
            }
        }
    } else if (type == 3) {
        for (i = 0; i < data.length; i++) {
            var dd = data[i];
            var day = new Date(dd.outTime).getDate();
            if (load[day] == undefined) {
                load[day] = 1;
            } else {
                load[day]++;
            }
        }
    }

    //把空值设为0
    if (type == 3) {
        for (i = 0; i <= parseInt(Workload.day) + parseInt(Workload.days); i++) {
            if (load[i] == undefined) {
                load[i] = 0;
            }
        }
    } else {
        for (i = 0; i <= Workload.rectNum; i++) {
            if (load[i] == undefined) {
                load[i] = 0;
            }
        }
    }
    Workload.Data = load;
    Workload.type = type;
    draw(canvas);
}


//type,0,代表年,1代表月,2代表日
//开始绘画
function draw(canvas) {
    var context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, Workload.width(), Workload.height());
    context.font = "10px Georgia";

    lineXY(context);
    drawCloseButton(context);
    Workload.init();
    myClearInterval();
    drawPic(context);
}

function myClearInterval() {
    //清除所有动画
    for (var i = 0; i < time.length; i++) {
        clearInterval(time[i]);
    }
    time.length = 0;
}

function drawCloseButton(context) {
    var image = new Image();
    image.src = "../images/index/close.png";
    var imagex = Workload.width() - 37;
    var imagey = 5;
    if (image.complete) {
        context.drawImage(image, imagex, imagey);
    } else {
        image.onload = function () {
            context.drawImage(image, imagex, imagey);
        }
    }
}

//循环每一个矩形
function drawPic(context) {
    for (var i = 0; i <= Workload.rectNum; i++) {
        if (i == 0) {
            continue;
        }
        aniH(context, i, 0);
    }
    open();
}

//动画实现
//-----bug---动画进行中切换数据会出错
var time = [];
function aniH(context, i, hh) {
    var geadd = Workload.limitY / 2500;
    var getime = 10;
    var signTime = setInterval(function () {
        //通过i-1,把i==0,占用的空间去掉
        createRect(context, Workload.getX(Workload.unitLengthX * ((i - 1) * 2 + 1)), Workload.unitLengthX, hh += getime * geadd, i);
        if (hh >= (Workload.type == 3 ? Workload.Data[Workload.day + i - 1] : Workload.Data[i])) {
            window.clearInterval(signTime);
            createRect(context, Workload.getX(Workload.unitLengthX * ((i - 1) * 2 + 1)), Workload.unitLengthX, hh += getime * geadd, i, true);
        }
    }, 10);
    time.push(signTime);
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

    //画xy轴上的字
    //y轴
    context.fillText(Workload.limitY + "", Workload.getX(-20), Workload.getY(Workload.getRectMaxH()));
    context.fillText("啦啦啦", 20, 80);

    context.stroke();
}

//创建矩形类,同时添加鼠标响应事件,同时把事件响应注册到数组里
function createRect(context, x, width, height, whichDay, isAddToEvent) {
    //每创建一个矩形就把它画出来
    var y = height * Workload.unitLengthY();
    if (isAddToEvent) {
        var o = new Object();
        o.x = x;
        o.width = width;
        o.height = height;
        o.whichDay = whichDay;
        o.y = Workload.getY(0) - y;
        o.mouseMove = function (e) {
            switch (Workload.type) {
                case 0:
                    toast.innerHTML = Workload.year + "-" + this.whichDay + " " + Workload.Data[this.whichDay] + "件";
                    break;
                case 1:
                    toast.innerHTML = Workload.year + "-" + Workload.month + "-" + this.whichDay + " " + Workload.Data[this.whichDay] + "件";
                    break;
                case 2:
                    toast.innerHTML = this.whichDay + "点" + Workload.Data[this.whichDay] + "件";
                    break;
                case 3:
                    toast.innerHTML = this.whichDay - 1 + Workload.day + "天" + Workload.Data[this.whichDay - 1 + Workload.day] + "件";
                    break;
            }
            toast.style.display = "block";
            toast.style.left = e.x + 20 + "px";
            toast.style.top = e.y + 20 + "px";
        };
        Workload.mouseEvent.push(o);
    }
    context.fillStyle = "#42b983";
    context.fillRect(x, Workload.getY(0) - y, width, y);
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
canvas.addEventListener("click", function (e) {
    //如果点击范围在关闭按钮上,那么关闭
    if (e.clientX - e.target.offsetLeft >= Workload.width() - 37 && e.clientY - e.target.offsetTop <= 37) {
        close();
    }
});

function close() {
    $(canvas).attr("class", "workload_canvas");
    ReactDOM.render(<EmptyComponent />,
        document.getElementById("workload_input_container"))
}

function open() {
    $(canvas).attr("class", "workload_canvas_on workload_canvas");
}
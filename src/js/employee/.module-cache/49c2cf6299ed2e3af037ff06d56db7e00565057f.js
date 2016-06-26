/**
 * Created by songchao on 16/6/25.
 */


var canvas = document.getElementById("workload_canvas");
//test--data
var data = [200, 300, 400, 500, 600, 700, 100, 200, 300, 500, 400, 800];
var type = 1;

show();

draw(canvas, data, type);


/*ReactDOM.render(
 <Workload />,
 document.getElementById("baidu_map")
 );*/

//type,0,代表年,1代表月,2代表日
function draw(canvas, data, type) {
    var width = document.getElementById("baidu_map").offsetWidth;

    console.info(width);

    var context = canvas.getContext("2d");
    context.font = "10px Georgia";
    var zerox = 20;//x轴坐标原点
    var zeroy = width - 20;//y轴坐标原点

    var mouseEvent = [];//事件注册到这个数组

    //x轴长度,width-40
    //y轴长度,width-40
    lineXY();

    function lineXY() {
        //画x,y轴
        context.beginPath();
        context.moveTo(zerox, zeroy);
        context.lineTo(zerox, zeroy - (width - 40));//画y轴
        context.lineTo(zerox - 5, zeroy - (width - 40) + 5);//画箭头左边
        context.moveTo(zerox, zeroy - (width - 40));
        context.lineTo(zerox + 5, zeroy - (width - 40) + 5);//画箭头右边
        context.fillText("工作量", zerox - 5, zeroy - (width - 40) - 5);
        context.stroke();

        context.moveTo(zerox, zeroy);
        context.lineTo(zerox + (width - 40), zeroy);//画x轴
        context.lineTo(zerox + (width - 40) - 5, zeroy + 5);//画箭头上半部分
        context.moveTo(zerox + (width - 40), zeroy);
        context.lineTo(zerox + (width - 40) - 5, zeroy - 5);//画箭头下半部分
        context.fillText("时间", zerox + (width - 40) - 30, zeroy + 20);
        context.stroke();
    }

    function createRect(x, width, height) {
        var o = new Object();
        o.x = x;
        o.width = width;
        o.height = height;

        //每创建一个矩形就把它画出来
        context.fillRect(x, zeroy, width, height);

        return o;
    }
}


function onCloseWorkload() {
    ReactDOM.render(
        React.createElement(EmptyComponent, {key: "emptycom"}),
        document.getElementsByClassName("baidu_map_close")[0]);
    $("#baidu_map").attr("class", "baidu_map");
}
function show() {
    function createCloseTo() {
        ReactDOM.render(
            React.createElement(BeforeButton, {onCloseClick: onCloseWorkload}),
            document.getElementsByClassName("baidu_map_close")[0]);
    }

    setTimeout(createCloseTo, 1000);
    $("#baidu_map").attr("class", "baidu_map baidu_map_on");
}
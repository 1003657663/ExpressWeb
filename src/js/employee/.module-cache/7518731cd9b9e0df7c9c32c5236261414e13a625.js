/**
 * Created by songchao on 16/6/17.
 */

/**
 * 左边容器
 */
var Left = React.createClass({displayName: "Left",
    componentDidMount: function () {
        var canvas = this.refs.canvas;
        //test--data
        var data = [200,300,400,500,600,700,100,200,300,500,400,800];
        var type=1;
        draw(canvas,data,type);
    },
    render: function () {
        return (
            React.createElement("div", {className: "hidden-xs col-sm-3 col-md-4 left-component"}, 
                React.createElement("canvas", {height: "500px", ref: "canvas"}, 
                    "您的浏览器不支持canvas请更新"
                )
            )
        );
    }
});

//type,0,代表年,1代表月,2代表日
function draw(canvas,data,type) {
    var width = (document.body.offsetWidth-30)/3-30;
    var context = canvas.getContext("2d");
    context.font = "20px Georgia";
    var zerox = 20;//x轴坐标原点
    var zeroy = width-20;//y轴坐标原点

    var mouseEvent = [];//事件注册到这个数组

    //x轴长度,width-40
    //y轴长度,width-40
    lineXY();

    function lineXY() {
        //画x,y轴
        context.beginPath();
        context.moveTo(zerox,zeroy);
        context.lineTo(zerox,zeroy-(width-40));
        context.lineTo(zerox-10,zeroy-(width-40)+10);
        context.moveTo(zerox,zeroy-(width-40));
        context.lineTo(zerox+10,zeroy-(width-40)+10);
        context.fillText("工作量",zerox-5,zeroy-(width-40)-5);
        context.stroke();

        context.moveTo(zerox,zeroy);
        context.lineTo(zerox+(width-40),zeroy);
        context.lineTo(zerox+(width-40)-10,zeroy+10);
        context.moveTo(zerox+(width-40),zeroy);
        context.lineTo(zerox+(width-40)-10,zeroy-10);
        context.stroke();
    }

    function createRect(x,width,height) {
        var o = new Object();
        o.x = x;
        o.width = width;
        o.height = height;

        //每创建一个矩形就把它画出来
        context.fillRect(x,zeroy,width,height);

        return o;
    }
}
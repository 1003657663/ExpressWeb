/**
 * Created by songchao on 16/6/17.
 */

/**
 * 左边容器
 */
var Left = React.createClass({displayName: "Left",
    componentDidMount: function () {
        var canvas = this.refs.canvas;
        draw(canvas);
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

function draw(canvas) {
    var width = (document.body.offsetWidth-30)/3-30;
    var context = canvas.getContext("2d");

    var zerox = 20;//x轴坐标原点
    var zeroy = width-20;//y轴坐标原点

    var mouseEvent = [];//事件注册到这个数组

    //x轴长度,width-40
    //y轴长度,width-40

    function lineXY() {
        //画x,y轴
        context.beginPath();
        context.moveTo(zerox,zeroy);
        context.lineTo(zerox,zeroy-(width-40));
        context.lineTo(zerox-10,zeroy-(width-40)+10);
        context.moveTo(zerox,zeroy-(width-40));
        context.lineTo(zerox+10,zeroy-(width-40)+10);
        context.stroke();

        context.moveTo(zerox,zeroy);
        context.lineTo(zerox+(width-40),zeroy);
        context.lineTo(zerox+(width-40)-10,zeroy+10);
        context.moveTo(zerox+(width-40),zeroy);
        context.lineTo(zerox+(width-40)-10,zeroy-10);
        context.stroke();
    }

    function createRect(x,width,height) {
        var o = new object();
        o.x = x;
        o.width = width;
        o.height = height;
    }
}
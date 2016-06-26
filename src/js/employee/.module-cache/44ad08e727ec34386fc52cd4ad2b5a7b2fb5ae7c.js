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

    //画x轴
    var zerox = 20;
    var zeroy = width-60;

    //x轴长度,width-40
    //y轴长度,width-40

    context.beginPath();
    context.moveTo(zerox,zeroy);
    context.lineTo(zerox,zeroy-(width-40));
    context.stroke();

    context.moveTo(zerox,zeroy);
    context.lineTo(zerox+(width-40),zeroy);
    context.stroke();
}
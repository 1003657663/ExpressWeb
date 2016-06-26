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
                React.createElement("canvas", {ref: "canvas"}, 
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
    var x = 20;
    var y = width*-1-20;

    context.moveTo(x,y);
    context.lineTo(0,0);
}
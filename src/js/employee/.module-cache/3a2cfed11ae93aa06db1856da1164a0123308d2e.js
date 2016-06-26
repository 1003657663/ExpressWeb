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
    var context = canvas.getContext("2d");
    context.font = "20px Georgia";
    context.fillText("这是测试canvas",10,50);

}
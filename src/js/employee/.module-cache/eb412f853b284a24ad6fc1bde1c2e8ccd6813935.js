/**
 * Created by songchao on 16/6/25.
 */

var Workload = React.createClass({displayName: "Workload",

    componentDidMount: function () {
        var canvas = this.refs.canvas;
    },
    render: function () {
        return (
            React.createElement("canvas", {ref: "canvas", width: "100%", height: "100%"}, 
                "您的浏览器不支持canvas,请升级"
            )
        );
    }
});

function createCloseTo(){
    ReactDOM.render(
        React.createElement(BeforeButton, {onCloseClick: onCloseBaiduMap}),
        document.getElementsByClassName("baidu_map_close")[0]);
}
function onCloseWorkload() {
    ReactDOM.render(
        React.createElement(EmptyComponent, {key: "emptycom"}),
        document.getElementsByClassName("baidu_map_close")[0]);
    $("#baidu_map").attr("class", "baidu_map");
}
function show(){
    setTimeout(createCloseTo, 1000);
    $("#baidu_map").attr("class", "baidu_map baidu_map_on");
}
/**
 * Created by songchao on 16/6/14.
 */

/**
 * 中间所有部分容器,包括,左右
 */
var CenterComponent = React.createClass({displayName: "CenterComponent",
    render: function () {
        return (
            React.createElement("div", {className: "container-fluid center-component"}, 
                React.Children.map(this.props.children, function (child) {
                    return child;
                })
            )
        );
    }
});

var Content = React.createClass({displayName: "Content",
    getInitialState: function () {
        return null;
    },
    testClick: function () {
        closeAllDialog();
        $('#myModal2').modal('toggle');
    },
    render: function () {
        var conStyle = {height: "100%"};
        return (
            React.createElement("div", {style: conStyle}, 
                React.createElement(NavBar, null), 
                React.createElement(CenterComponent, null, 
                    React.createElement(Left, null), 
                    React.createElement(Main, null), 
                    React.createElement(Right, null)
                )
            )
        )
    }
});
/**
 * 分发组件到dom树
 */
ReactDOM.render(
    React.createElement(Content, null),
    document.getElementById("content")
);
/**
 * Created by songchao on 16/6/14.
 */
var CenterComponent = React.createClass({displayName: "CenterComponent",
    render: function () {
        return (
            React.createElement("div", null
                
            )
        );
    }
});
var Content = React.createClass({displayName: "Content",
    render: function () {
        var conStyle = {height: "100%"};
        return (
            React.createElement("div", {style: conStyle}, 
                React.createElement(NavBar, null), 
                React.createElement(CenterComponent, null, 
                    React.createElement(Main, null)
                ), 
                React.createElement(Footer, null)
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
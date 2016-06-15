/**
 * Created by songchao on 16/6/14.
 */
var LoginContainer = React.createClass({displayName: "LoginContainer",
    render: function () {
        return (
            React.createElement("div", {classID: "login_container"})
        );
    }
});

var Content = React.createClass({displayName: "Content",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(NavBar, null), 
                React.createElement(LoginContainer, null)
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
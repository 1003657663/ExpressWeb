/**
 * Created by songchao on 16/6/15.
 */


/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({displayName: "UserInfo",
    render: function () {
        return (
            React.createElement("div", {className: "container user_info"}, 
                React.createElement("div", {className: "user_icon"}), 
                React.createElement("p", {className: "user_name"}, "宋超"), 
                React.createElement("p", {className: "user_tel"}, "15038290935")
            )
        )
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({displayName: "Main",
    render: function () {
        return (
            React.createElement("div", {className: "main"}, 
                React.createElement(UserInfo, null)
            )
        );
    }
});
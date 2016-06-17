/**
 * Created by songchao on 16/6/15.
 */

/*var User = {
 isLogin:false,
 name:"",
 tel:"",
 password:""
 };
 var a = 10;*/
/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState: function () {
        if (User.isLogin) {
            return {
                headimg: "../images/head.jpg",
                userName: "宋超",
                telephone: "15038290935"
            }
        } else {
            return {
                headimg: "../images/head.jpg",
                userName: "宋超",
                telephone: "15038290935"
            }
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "container user_info"}, 
                React.createElement("div", {className: "user_icon"}, 
                    React.createElement("img", {src: this.state.headimg})
                ), 
                React.createElement("p", {className: "user_name"}, this.state.userName), 
                React.createElement("p", {className: "user_tel"}, this.state.telephone)
            )
        )
    }
});

var SendExpressButton = React.createClass({displayName: "SendExpressButton",

    render: function () {
        return (
            
            React.createElement("div", {className: "send_express_button"}, 
                React.createElement("div", {class: "send_icon_container"}, 
                    React.createElement("img", {src: "../images/main/send_express.png"})
                )
            )
        );
    }
});

var ButtonContainer = React.createClass({displayName: "ButtonContainer",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(SendExpressButton, null)
            )
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({displayName: "Main",
    render: function () {
        return (
            React.createElement("div", {className: "main"}, 
                React.createElement(UserInfo, null), 
                React.createElement(ButtonContainer, null)
            )
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */

/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState: function () {
        return {
            headimg: "../images/head.jpg",
            userName: "宋超",
            telephone: "15038290935"
        };
    },
    handlNoLoginClick: function () {
        if(!User.isLogin){
            ReactDOM.render(
                React.createElement(Login, {isLogin: "true", key: "isLogin"}),
                document.getElementById("login_container")
            );
        }
    },
    onOver:function () {
        if(!User.isLogin) {
            this.setState({headimg: "../images/head_camera.png"});
        }
    },
    onOut:function () {
        this.setState({headimg:"../images/head.jpg"});
    },
    render: function () {
        return (
            React.createElement("div", {className: "row user_info"}, 
                React.createElement("div", {className: "user_icon"}, 
                    React.createElement("img", {src: this.state.headimg, onMouseOver: this.onOver, onMouseOut: this.onOut})
                ), 
                React.createElement("p", {className: "user_name"}, React.createElement("a", {href: "#", onClick: this.handlNoLoginClick}, this.state.userName)), 
                React.createElement("p", {className: "user_tel"}, this.state.telephone)
            )
        )
    }
});

/**
 * 寄快递按钮
 */
var SendExpressButton = React.createClass({displayName: "SendExpressButton",
    propTypes:{
        sendExpressClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 send_express_button", onClick: this.props.sendExpressClick}, 
                React.createElement("div", {className: "send_icon_container"}, 
                    React.createElement("img", {src: "../images/main/send_express.png"})
                ), 
                React.createElement("p", {className: "send_express_text"}, "寄快递")
            )
        );
    }
});

/**
 * 历史记录按钮
 */
var ExpressHistoryButton = React.createClass({displayName: "ExpressHistoryButton",
    propTypes:{
        expressHistoryClick:React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 express_history_container", onClick: this.props.expressHistoryClick}, 
                React.createElement("div", {className: "express_history_icon_container"}, 
                    React.createElement("img", {src: "../images/main/express_history.png"})
                ), 
                React.createElement("div", {className: "express_history_text"}, "历史记录")
            )
        );
    }
});

/**
 * Address查看或者修改按钮
 */
var AddressButton = React.createClass({displayName: "AddressButton",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 address_button_container"}, 
                React.createElement("div", {className: "address_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/express_history.png"})
                ), 
                React.createElement("div", {className: "address_button_text"}, "地址管理")
            )
        )
    }
});

/**
 * 个人信息
 */
var MyInfo = React.createClass({displayName: "MyInfo",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 myinfo_button_container"}, 
                React.createElement("div", {className: "myinfo_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/express_history.png"})
                ), 
                React.createElement("div", {className: "myinfo_button_text"}, "地址管理")
            )
        );
    }
});

/**
 * 中间按钮部分
 */
var ButtonContainer = React.createClass({displayName: "ButtonContainer",
    propTypes:{
        sendExpressClick:React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "button-container"}, 
                React.createElement("div", {className: "row first_button_container"}, 
                    React.createElement(SendExpressButton, {sendExpressClick: this.props.sendExpressClick}), 
                    React.createElement(ExpressHistoryButton, {expressHistoryClick: this.props.expressHistoryClick})
                ), 
                React.createElement("div", {className: "row second_button_container"}, 
                    React.createElement(AddressButton, null), 
                    React.createElement(MyInfo, null)
                )
            )
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({displayName: "Main",
    onCloseClick: function () {
        //关闭按钮被点击处理
        this.setState({
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ButtonContainer, {key: "buttoncontainer", sendExpressClick: this.handleSendExpressClick, expressHistoryClick: this.handlerExpressHistoryClick, addressClick: ""}),
                React.createElement(Footer, {key: "footer"})
            ]
        })
    },
    handleSendExpressClick: function () {
        this.setState({
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Address, {key: "address"}),
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick, key: "beforebutton"})
            ]
        });
    },
    handlerExpressHistoryClick: function () {
        this.setState({
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ExpressHistotyComponent, {key: "expresshistory"}),
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick, key: "beforebutton"})
            ]
        })
    },
    getInitialState:function () {
        var init = {
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ButtonContainer, {key: "buttoncontainer", sendExpressClick: this.handleSendExpressClick, expressHistoryClick: this.handlerExpressHistoryClick, addressClick: ""}),
                React.createElement(Footer, {key: "footer"})
            ]
        };
        return init;
    },
    render: function () {
        return (
            React.createElement("div", {className: "container col-sm-6 col-md-4 main"}, 
                this.state.child
            )
        );
    }
});
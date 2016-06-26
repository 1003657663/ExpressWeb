/**
 * Created by songchao on 16/6/15.
 */

/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({displayName: "UserInfo",
    getInitialState: function () {
        User.UserInfo = this;
        var info = {headimg: "../images/head.jpg"};
        if (User.isLogin) {
            info.name = User.name;
            info.isLogin = User.isLogin;
            info.telephone = User.telephone;
        } else {
            info.isLogin = User.isLogin;
        }
        return info;
    },
    handlNoLoginClick: function () {
        if (!User.isLogin) {
            ReactDOM.render(
                React.createElement(Login, {key: "isLogin"}),
                document.getElementById("login_container")
            );
        }
    },
    onOver: function () {
        if (!User.isLogin) {
            this.setState({headimg: "../images/head_camera.png"});
        }
    },
    onOut: function () {
        this.setState({headimg: "../images/head.jpg"});
    },
    render: function () {
        return (
            React.createElement("div", {className: "row user_info"}, 
                React.createElement("div", {className: "user_icon"}, 
                    React.createElement("img", {src: this.state.headimg, onMouseOver: this.onOver, onMouseOut: this.onOut})
                ), 
                React.createElement("p", {className: "user_name"}, 
                    React.createElement("a", {href: "#", onClick: this.handlNoLoginClick}, 
                        this.state.isLogin == true ? this.state.name : "未登录"
                    )
                ), 
                React.createElement("p", {className: "user_tel"}, 
                    this.state.isLogin == true ? this.state.telephone : ""
                )
            )
        )
    }
});

/**
 * 寄快递按钮
 */
var PackageIn = React.createClass({displayName: "PackageIn",
    propTypes: {
        packageInClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 send_express_button", onClick: this.props.packageInClick}, 
                React.createElement("div", {className: "package_in_icon_container"}, 
                    React.createElement("img", {src: "../images/employee/package_in.png"})
                ), 
                React.createElement("p", {className: "send_express_text"}, "打包")
            )
        );
    }
});

/**
 * 历史记录按钮
 */
var PackageOut = React.createClass({displayName: "PackageOut",
    propTypes: {
        packageOutClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 express_history_container", onClick: this.props.packageOutClick}, 
                React.createElement("div", {className: "express_history_icon_container"}, 
                    React.createElement("img", {src: "../images/employee/package_out.png"})
                ), 
                React.createElement("div", {className: "express_history_text"}, "拆包")
            )
        );
    }
});

/**
 * Address查看或者修改按钮
 */
var AddressButton = React.createClass({displayName: "AddressButton",
    propTypes: {
        addressClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 address_button_container", onClick: this.props.addressClick}, 
                React.createElement("div", {className: "address_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/address_button.png"})
                ), 
                React.createElement("div", {className: "address_button_text"}, "地址管理")
            )
        )
    }
});

/**
 * 修改密码
 */
var ChangePasswordButton = React.createClass({displayName: "ChangePasswordButton",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 myinfo_button_container", onClick: this.props.onPasswordClick}, 
                React.createElement("div", {className: "myinfo_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/passwordbutton.png"})
                ), 
                React.createElement("div", {className: "myinfo_button_text"}, "修改密码")
            )
        );
    }
});

/**
 * 中间按钮部分
 */
var ButtonContainer = React.createClass({displayName: "ButtonContainer",
    propTypes: {
        sendExpressClick: React.PropTypes.func
    },
    render: function () {
        return (
            React.createElement("div", {className: "button-container"}, 
                React.createElement("div", {className: "row first_button_container"}, 
                    React.createElement(PackageIn, {packageInClick: this.props.packageInClick}), 
                    React.createElement(PackageOut, {packageOutClick: this.props.packageOutClick})
                ), 
                React.createElement("div", {className: "row second_button_container"}, 
                    React.createElement(AddressButton, {addressClick: this.props.addressClick}), 
                    React.createElement(ChangePasswordButton, {onPasswordClick: this.props.onPasswordClick})
                )
            )
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({displayName: "Main",
    onCloseClick: function (child) {
        //关闭按钮被点击处理
        if (child[0] == true) {
            this.setState({
                child: [
                    React.createElement(UserInfo, {key: "userinfo"}),
                    React.createElement(ButtonContainer, {
                        key: "buttoncontainer", 
                        packageInClick: this.handlePackageInClick, 
                        packageOutClick: this.handlerPackageOutClick, 
                        addressClick: this.handleAddressClick, 
                        onPasswordClick: this.handlePasswordClick}
                    )
                ]
            });
        } else {
            this.setState({
                child: child
            });
        }
    }
    ,
    handlePackageInClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能打包", true);
            return;
        }

        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Package, {isPackageIn: true, onCloseClick: this.onCloseClick, key: "packagein"})
            ]
        });
    }
    ,
    handlerPackageOutClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后查看历史记录", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Package, {key: "packageout", onCloseClick: this.onCloseClick, isPackageIn: false})
            ]
        })
    }
    ,
    handleAddressClick: function () {
        if (!User.isLogin) {
            showDialog("dialog", "警告", "登录后才能管理地址", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(Address, {onCloseClick: this.onCloseClick, key: "addressmanage"}),
            ]
        })
    },
    handlePasswordClick: function () {
        this.setState({
            child:[
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ChangePassword, {onCloseClick: this.onCloseClick})
            ]
        })
    },
    getInitialState: function () {
        User.Main = this;
        
        var init = {
            child: [
                React.createElement(UserInfo, {key: "userinfo"}),
                React.createElement(ButtonContainer, {
                    key: "buttoncontainer", 
                    packageInClick: this.handlePackageInClick, 
                    packageOutClick: this.handlerPackageOutClick, 
                    addressClick: this.handleAddressClick, 
                    onPasswordClick: this.handlePasswordClick}
                ),
            ]
        };
        return init;
    }
    ,
    render: function () {
        return (
            React.createElement("div", {className: "container col-sm-6 col-md-4 main"}, 
                this.state.child, 
                React.createElement(Footer, {onCloseClick: this.onCloseClick, key: "footer"})
            )
        );
    }
});
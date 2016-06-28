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
 * 打包按钮
 */
var PackageIn = React.createClass({displayName: "PackageIn",
    propTypes: {
        packageInClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    onClick: function () {
        if(User.job == 3){//如果是司机那么直接弹出司机绑定包裹弹窗
            driverDialog();
        }else {
            this.props.packageInClick();
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 send_express_button", onClick: this.onClick}, 
                React.createElement("div", {className: "package_in_icon_container"}, 
                    React.createElement("img", {src: "../images/employee/package_in.png"})
                ), 
                React.createElement("p", {className: "send_express_text"}, "打包")
            )
        );
    }
});

/**
 * 司机点击打包后弹出
 */
function driverDialog() {
    var packageID;
    function sureButtonClick() {
        if(packageID!=undefined && !isNaN(packageID) && packageID!=""){
            //把包裹和司机绑定
            Tools.myAjax({
                type:"get",
                url:"/REST/Domain/setDriverPackage/employeeId/"+User.id+"/packageId/"+packageID,
                success: function (data) {
                    if(data.state == "1"){
                        showDialog("dialog","恭喜","您获取包裹成功,请上路,别忘了开启手机客户端上传路径",true);
                    }else{
                        showDialog("dialog","警告","获取包裹失败,请检查包裹号是否正确",true);
                    }
                },
                error: function (data) {
                    console.error(data);
                    showDialog("dialog","错误","包裹绑定给司机出错,请重试",true);
                }
            })
        }else{
            showDialog("diaolg","警告","包裹号不可以为空和非数字字符",true);
        }
    }
    function onChange(e) {
        packageID = e.target.value;
    }
    var inputStyle = {width: "100%"};
    showDialog("dialog","提示",(
        React.createElement("input", {onChange: onChange, style: inputStyle, placeholder: "请输入包裹ID"})
    ),true,sureButtonClick,null,null,false);
}

/**
 * 拆包按钮
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
 * 我是经理
 */
var ManagerButton = React.createClass({displayName: "ManagerButton",
    propTypes: {
        addressClick: React.PropTypes.func
    },
    handleClick: function () {
        if(User.job == 4) {
            this.props.managerClick();
        }else{
            showDialog("dialog","警告","只有经理才有权限进入",true);
        }
    },
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 address_button_container", onClick: this.handleClick}, 
                React.createElement("div", {className: "address_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/manager.png"})
                ), 
                React.createElement("div", {className: "address_button_text"}, "我是经理")
            )
        )
    }
});

/**
 * 查看工作记录
 */
var CheckWorkloadButton = React.createClass({displayName: "CheckWorkloadButton",
    render: function () {
        return (
            React.createElement("div", {className: "col-xs-6 myinfo_button_container", onClick: this.props.onCheckWorkload}, 
                React.createElement("div", {className: "myinfo_button_icon_container"}, 
                    React.createElement("img", {src: "../images/main/workload.png"})
                ), 
                React.createElement("div", {className: "myinfo_button_text"}, "查看工作量")
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
                React.createElement("div", {key: "row1", className: "row first_button_container"}, 
                    React.createElement(PackageIn, {key: "packagein", packageInClick: this.props.packageInClick}), 
                    React.createElement(PackageOut, {key: "packageout", packageOutClick: this.props.packageOutClick})
                ), 
                React.createElement("div", {key: "row2", className: "row second_button_container"}, 
                    React.createElement(ManagerButton, {managerClick: this.props.managerClick}), 
                    React.createElement(CheckWorkloadButton, {key: "checkworkload", onCheckWorkload: this.props.onCheckWorkload})
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
                        managerClick: this.handleManaberClick, 
                        onCheckWorkload: this.onCheckWorkload}
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
            showDialog("dialog", "警告", "登录后拆包", true);
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
    handleManaberClick: function () {
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
    onCheckWorkload: function () {
        showWorkload();
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
                    managerClick: this.handleManaberClick, 
                    onCheckWorkload: this.onCheckWorkload}
                ),
            ]
        };
        return init;
    },
    render: function () {
        return (
            React.createElement("div", {className: "container col-sm-6 col-md-4 main"}, 
                this.state.child, 
                React.createElement(Footer, {onCloseClick: this.onCloseClick, key: "footer"})
            )
        );
    }
});

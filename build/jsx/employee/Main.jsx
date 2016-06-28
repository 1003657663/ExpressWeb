/**
 * Created by songchao on 16/6/15.
 */

/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({
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
                <Login key="isLogin"/>,
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
            <div className="row user_info">
                <div className="user_icon">
                    <img src={this.state.headimg} onMouseOver={this.onOver} onMouseOut={this.onOut}/>
                </div>
                <p className="user_name">
                    <a href="#" onClick={this.handlNoLoginClick}>
                        {this.state.isLogin == true ? this.state.name : "未登录"}
                    </a>
                </p>
                <p className="user_tel">
                    {this.state.isLogin == true ? this.state.telephone : ""}
                </p>
            </div>
        )
    }
});

/**
 * 打包按钮
 */
var PackageIn = React.createClass({
    propTypes: {
        packageInClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    onClick: function () {
        if (User.job == 3) {//如果是司机那么直接弹出司机绑定包裹弹窗
            driverDialog();
        } else {
            this.props.packageInClick();
        }
    },
    render: function () {
        return (
            <div className="col-xs-6 send_express_button" onClick={this.onClick}>
                <div className="package_in_icon_container">
                    <img src="../images/employee/package_in.png"/>
                </div>
                <p className="send_express_text">打包</p>
            </div>
        );
    }
});

/**
 * 司机点击打包后弹出
 */
function driverDialog() {
    var packageID;

    function sureButtonClick() {
        if (packageID != undefined && !isNaN(packageID) && packageID != "") {
            //把包裹和司机绑定
            Tools.myAjax({
                type: "get",
                url: "/REST/Domain/setDriverPackage/employeeId/" + User.id + "/packageId/" + packageID,
                success: function (data) {
                    if (data.state == "1") {
                        showDialog("dialog", "恭喜", "您获取包裹成功,请上路,别忘了开启手机客户端上传路径", true);
                    } else {
                        showDialog("dialog", "警告", "获取包裹失败,请检查包裹号是否正确", true);
                    }
                },
                error: function (data) {
                    console.error(data);
                    showDialog("dialog", "错误", "包裹绑定给司机出错,请重试", true);
                }
            })
        } else {
            showDialog("diaolg", "警告", "包裹号不可以为空和非数字字符", true);
        }
    }

    function onChange(e) {
        packageID = e.target.value;
    }

    var inputStyle = {width: "100%"};
    showDialog("dialog", "提示", (
        <input onChange={onChange} style={inputStyle} placeholder="请输入包裹ID"/>
    ), true, sureButtonClick, null, null, false);
}

/**
 * 拆包按钮
 */
var PackageOut = React.createClass({
    propTypes: {
        packageOutClick: React.PropTypes.func
    },
    render: function () {
        return (
            <div className="col-xs-6 express_history_container" onClick={this.props.packageOutClick}>
                <div className="express_history_icon_container">
                    <img src="../images/employee/package_out.png"/>
                </div>
                <div className="express_history_text">拆包</div>
            </div>
        );
    }
});

/**
 * 我是经理
 */
var ManagerButton = React.createClass({
    propTypes: {
        addressClick: React.PropTypes.func
    },
    handleClick: function () {
        if (User.job == 4) {
            this.props.managerClick();
        } else {
            showDialog("dialog", "警告", "只有经理才有权限进入", true);
        }
    },
    render: function () {
        return (
            <div className="col-xs-6 address_button_container" onClick={this.handleClick}>
                <div className="address_button_icon_container">
                    <img src="../images/main/manager.png"/>
                </div>
                <div className="address_button_text">我是经理</div>
            </div>
        )
    }
});

/**
 * 查看工作记录
 */
var CheckWorkloadButton = React.createClass({
    render: function () {
        return (
            <div className="col-xs-6 myinfo_button_container" onClick={this.props.onCheckWorkload}>
                <div className="myinfo_button_icon_container">
                    <img src="../images/main/workload.png"/>
                </div>
                <div className="myinfo_button_text">查看工作量</div>
            </div>
        );
    }
});

/**
 * 中间按钮部分
 */
var ButtonContainer = React.createClass({
    propTypes: {
        sendExpressClick: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            child1:[],
            child2:[],
            child3:[],
        }
    },
    componentWillReceiveProps: function () {
        console.info("updata");
    },
    render: function () {
        return (
            <div className="button-container">
                <div key="row1" className="row first_button_container">
                    {this.props.child1.map(function (data, index) {
                        return data
                    })}
                </div>
                <div key="row2" className="row second_button_container">
                    {this.props.child2.map(function (data, index) {
                        return data
                    })}
                </div>
                {this.props.child3.map(function (data, index) {
                    return data
                })}
            </div>
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({
    onCloseClick: function (child) {
        //关闭按钮被点击处理
        if (child[0] == true) {
            this.setState({
                child: [
                    <ButtonContainer
                        child1={[
                            <PackageIn key="packagein" packageInClick={this.handlePackageInClick}/>,
                            <PackageOut key="packageout" packageOutClick={this.handlerPackageOutClick}/>
                        ]}
                        child2={[
                            <ManagerButton key="managerbutton" managerClick={this.handleManaberClick}/>,
                            <CheckWorkloadButton key="checkworkload" onCheckWorkload={this.onCheckWorkload}/>
                        ]}
                        key="buttoncontainer"
                    />
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
                <Package isPackageIn={true} onCloseClick={this.onCloseClick} key="packagein"/>
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
                <Package key="packageout" onCloseClick={this.onCloseClick} isPackageIn={false}/>
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
                <ManagerComponent onCloseClick={this.onCloseClick} key="managecomponent"/>,
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
                <ButtonContainer
                    child1={[
                            <PackageIn key="packagein" packageInClick={this.handlePackageInClick}/>,
                            <PackageOut key="packageout" packageOutClick={this.handlerPackageOutClick}/>
                        ]}
                    child2={[
                            <ManagerButton key="managerbutton" managerClick={this.handleManaberClick}/>,
                            <CheckWorkloadButton key="checkworkload" onCheckWorkload={this.onCheckWorkload}/>
                        ]}
                    key="buttoncontainer"
                />
            ]
        };
        return init;
    },
    render: function () {
        return (
            <div className="container col-sm-6 col-md-4 main">
                <UserInfo key="userinfo"/>
                {this.state.child}
                <Footer onCloseClick={this.onCloseClick} key="footer"/>
            </div>
        );
    }
});

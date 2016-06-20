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
        if(User.isLogin){
            info.name = User.name;
            info.isLogin = User.isLogin;
            info.telephone= User.telephone;
        }else{
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
                        {this.state.isLogin == true? this.state.name:"未登录"}
                    </a>
                </p>
                <p className="user_tel">
                    {this.state.isLogin == true? this.state.telephone: ""}
                </p>
            </div>
        )
    }
});

/**
 * 寄快递按钮
 */
var SendExpressButton = React.createClass({
    propTypes: {
        sendExpressClick: React.PropTypes.func
    },
    getInitialState: function () {
        return null;
    },
    render: function () {
        return (
            <div className="col-xs-6 send_express_button" onClick={this.props.sendExpressClick}>
                <div className="send_icon_container">
                    <img src="../images/main/send_express.png"/>
                </div>
                <p className="send_express_text">寄快递</p>
            </div>
        );
    }
});

/**
 * 历史记录按钮
 */
var ExpressHistoryButton = React.createClass({
    propTypes: {
        expressHistoryClick: React.PropTypes.func
    },
    render: function () {
        return (
            <div className="col-xs-6 express_history_container" onClick={this.props.expressHistoryClick}>
                <div className="express_history_icon_container">
                    <img src="../images/main/express_history.png"/>
                </div>
                <div className="express_history_text">历史记录</div>
            </div>
        );
    }
});

/**
 * Address查看或者修改按钮
 */
var AddressButton = React.createClass({
    propTypes:{
        addressClick:React.PropTypes.func
    },
    render: function () {
        return (
            <div className="col-xs-6 address_button_container" onClick={this.props.addressClick}>
                <div className="address_button_icon_container">
                    <img src="../images/main/address_button.png"/>
                </div>
                <div className="address_button_text">地址管理</div>
            </div>
        )
    }
});

/**
 * 个人信息
 */
var MyInfo = React.createClass({
    render: function () {
        return (
            <div className="col-xs-6 myinfo_button_container">
                <div className="myinfo_button_icon_container">
                    <img src="../images/main/express_history.png"/>
                </div>
                <div className="myinfo_button_text">地址管理</div>
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
    render: function () {
        return (
            <div className="button-container">
                <div className="row first_button_container">
                    <SendExpressButton sendExpressClick={this.props.sendExpressClick}/>
                    <ExpressHistoryButton expressHistoryClick={this.props.expressHistoryClick}/>
                </div>
                <div className="row second_button_container">
                    <AddressButton addressClick={this.props.addressClick}/>
                    <MyInfo />
                </div>
            </div>
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({
    onCloseClick: function () {
        //关闭按钮被点击处理
        this.setState({
            child: [
                <UserInfo key="userinfo"/>,
                <ButtonContainer
                    key="buttoncontainer"
                    sendExpressClick={this.handleSendExpressClick}
                    expressHistoryClick={this.handlerExpressHistoryClick}
                    addressClick={this.handleAddressClick}
                />,
            ]
        })
    },
    handleSendExpressClick: function () {
        if(!User.isLogin){
            showDialog("dialog","警告","登录后才能寄快递",true);
            return;
        }
        this.setState({
            child: [
                <UserInfo key="userinfo"/>,
                <Address key="sendexpress"/>,
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            ]
        });
    },
    handlerExpressHistoryClick: function () {
        if(!User.isLogin){
            showDialog("dialog","警告","登录后查看历史记录",true);
            return;
        }
        this.setState({
            child: [
                <UserInfo key="userinfo"/>,
                <ExpressHistotyComponent key="expresshistory"/>,
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            ]
        })
    },
    handleAddressClick: function () {
        if(!User.isLogin){
            showDialog("dialog","警告","登录后才能管理地址",true);
            return;
        }
        this.setState({
            child: [
                <UserInfo key="userinfo"/>,
                <Address key="addressmanage"/>,
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            ]
        })
    },
    getInitialState: function () {
        var init = {
            child: [
                <UserInfo key="userinfo"/>,
                <ButtonContainer
                    key="buttoncontainer"
                    sendExpressClick={this.handleSendExpressClick}
                    expressHistoryClick={this.handlerExpressHistoryClick}
                    addressClick={this.handleAddressClick}
                />,
            ]
        };
        return init;
    },
    render: function () {
        return (
            <div className="container col-sm-6 col-md-4 main">
                {this.state.child}
                <Footer key="footer"/>
            </div>
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */

/**
 * 顶部-用户信息部分
 */
var UserInfo = React.createClass({
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
                <Login isLogin="true" key="isLogin"/>,
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
            <div className="row user_info">
                <div className="user_icon">
                    <img src={this.state.headimg} onMouseOver={this.onOver} onMouseOut={this.onOut} />
                </div>
                <p className="user_name"><a href="#" onClick={this.handlNoLoginClick}>{this.state.userName}</a></p>
                <p className="user_tel">{this.state.telephone}</p>
            </div>
        )
    }
});

/**
 * 寄快递按钮
 */
var SendExpressButton = React.createClass({
    propTypes:{
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
    propTypes:{
        expressHistoryClick:React.PropTypes.func
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
    render: function () {
        return (
            <div className="col-xs-6 address_button_container">
                <div className="address_button_icon_container">
                    <img src="../images/main/express_history.png"/>
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
    propTypes:{
        sendExpressClick:React.PropTypes.func
    },
    render: function () {
        return (
            <div className="button-container">
                <div className="row first_button_container">
                    <SendExpressButton sendExpressClick={this.props.sendExpressClick} />
                    <ExpressHistoryButton expressHistoryClick={this.props.expressHistoryClick} />
                </div>
                <div className="row second_button_container">
                    <AddressButton />
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
            child:[
                <UserInfo key="userinfo"/>,
                <ButtonContainer key="buttoncontainer" sendExpressClick={this.handleSendExpressClick} expressHistoryClick={this.handlerExpressHistoryClick} addressClick=""/>,
                <Footer key="footer"/>
            ]
        })
    },
    handleSendExpressClick: function () {
        this.setState({
            child:[
                <UserInfo key="userinfo"/>,
                <Address key="address"/>,
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            ]
        });
    },
    handlerExpressHistoryClick: function () {
        this.setState({
            child:[
                <UserInfo key="userinfo"/>,
                <ExpressHistotyComponent key="expresshistory"/>,
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            ]
        })
    },
    getInitialState:function () {
        var init = {
            child:[
                <UserInfo key="userinfo"/>,
                <ButtonContainer key="buttoncontainer" sendExpressClick={this.handleSendExpressClick} expressHistoryClick={this.handlerExpressHistoryClick} addressClick=""/>,
                <Footer key="footer"/>
            ]
        };
        return init;
    },
    render: function () {
        return (
            <div className="container col-sm-6 col-md-4 main">
                {this.state.child}
            </div>
        );
    }
});
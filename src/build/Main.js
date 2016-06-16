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
var UserInfo = React.createClass({
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
            <div className="row user_info">
                <div className="user_icon">
                    <img src={this.state.headimg}/>
                </div>
                <p className="user_name">{this.state.userName}</p>
                <p className="user_tel">{this.state.telephone}</p>
            </div>
        )
    }
});

var SendExpressButton = React.createClass({

    render: function () {
        return (
            <div className="col-xs-6 send_express_button">
                <div className="send_icon_container">
                    <img src="../images/main/send_express.png"/>
                </div>
                <p className="send_express_text">寄快递</p>
            </div>
        );
    }
});

var ExpressHistory = React.createClass({
    render : function () {
        return (
            <div className="col-xs-6 express_history_container">
                <div className="express_history_icon_container">
                    <img src="../images/main/express_history.png" />
                </div>
                <div className="express_history_text">历史记录</div>
            </div>
        );
    }
});

var ButtonContainer = React.createClass({
    render: function () {
        return (
            <div className="row first_button_container">
                <SendExpressButton />
                <ExpressHistory />
            </div>
        );
    }
});

/**
 * 页面中间的主要内容
 */
var Main = React.createClass({
    render: function () {
        return (
            <div className="container main">
                <UserInfo />
                <ButtonContainer />
            </div>
        );
    }
});
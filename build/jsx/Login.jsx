/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名组件
 */
var NameLogin = React.createClass({
    getInitialState: function () {
        return {nameText: ""}
    },
    handleNameChange: function (event) {
        var value = event.target.value;
        if (value.length > 6) {
            if (this.props.onError != null) {
                this.props.onError("姓名太长");
            }
        } else {
            this.setState({nameText: value});
            if (this.props.sendToParent != undefined) {
                this.props.sendToParent({nameText: value});
            }
        }
    },
    render: function () {
        return (
            <input type="text" value={this.state.nameText} className="login_name" placeholder="姓名"
                   onChange={this.handleNameChange}/>
        );
    }
});
/**
 * 电话号组件
 */
var Tel = React.createClass({
    getInitialState: function () {
        return {telephone: ""};
    },
    handleChange: function (event) {
        var telNum = event.target.value;
        if (Tools.isNum(telNum)) {
            if (this.props.sendToParent != undefined) {
                this.props.sendToParent({telephone: telNum});
            }
            this.setState({telephone: telNum});
        } else {
            if (this.props.onError != null) {
                this.props.onError("电话号必须是数字");
            }
        }

    },
    render: function () {
        return (
            <div>
                <input type="text" value={this.state.telephone} onChange={this.handleChange} placeholder="电话号"
                       className="login_tel"/>
            </div>
        );
    }
});

/**
 * 密码组件
 */
var Password = React.createClass({
    getInitialState: function () {
        return {password: ""};
    },
    handleChange: function (event) {
        if (this.props.sendToParent != undefined) {
            this.props.sendToParent({password: event.target.value});
        }
        this.setState({password: event.target.value})
    },
    render: function () {
        return (
            <div>
                <input type="password" placeholder="密码" onChange={this.handleChange} value={this.state.password}
                       className="login_password"/>
            </div>
        );
    }
});

/**
 * 关闭按钮
 */
var CloseButton = React.createClass({
    getInitialState: function () {
        return {src: "../images/index/close.png"};
    },
    handleMouseOve: function () {
        this.setState({src: "../images/index/close_on.png"});
    },
    handleMouseOu: function () {
        this.setState({src: "../images/index/close.png"});
    },
    handleClick: function () {
        if (this.props.onClose != undefined) {
            this.props.onClose();
        }
    },
    render: function () {
        return (
            <img className="login_close" onClick={this.handleClick} onMouseOver={this.handleMouseOve}
                 onMouseOut={this.handleMouseOu} src={this.state.src}/>
        );
    }
});

/**
 * 空组件
 */
var EmptyComponent = React.createClass({
    render: function () {
        return null;
    }
});

/**
 * 登陆组件
 */
var Login = React.createClass({
    getInitialState: function () {
        var temp;
        if (this.props.isLogin != undefined && this.props.isLogin == "true") {
            temp = {isLogin: true}
        } else {
            temp = {isLogin: false}
        }
        return Tools.extend(temp, {errorMessage: "", isProgress: -1});
    },
    handleSubmitClick: function (event) {
        //这里开始登陆
        setTimeout(function () {
            if(this.state.isProgress == -1 && this.isMounted()){
                this.setState({isProgress:true});
            }
        }.bind(this),800);
        startLogin(this);
    },
    handleSubmitStart: function (event) {
        event.preventDefault();
    },
    handleToRegister: function () {
        ReactDOM.render(
            <Login isLogin="false" key="noLogin"/>,
            document.getElementById("login_container")
        );
    },
    sendToParent: function (data) {
        this.state = Tools.extend(this.state, data);
    },
    handleError: function (message) {
        this.setState({errorMessage: message});
    },
    onClose: function () {
        ReactDOM.render(<EmptyComponent/>, document.getElementById("login_container"));
    },
    render: function () {
        var h3Style = {textAlign: "center", width: "100%", paddingBottom: "10px"};
        var aStyle = {color: "#2aabd2"};
        var errorStyle = {color: "red"};
        var nameCom;
        if (this.state.isLogin) {
            nameCom = undefined;
        } else {
            nameCom = <NameLogin sendToParent={this.sendToParent} onError={this.handleError}/>;
        }
        return (
            <form onSubmit={this.handleSubmitStart} method="get" className="login_window">
                <CloseButton onClose={this.onClose}/>
                <h3 style={h3Style}>登陆</h3>
                <Tel sendToParent={this.sendToParent} onError={this.handleError}/>
                {nameCom}
                <Password sendToParent={this.sendToParent} onError={this.handleError}/>
                <div><input type="submit" className="login_submit" onClick={this.handleSubmitClick} defaultValue="提交"/>
                </div>
                <p>还没有账号?<a href="#" onClick={this.handleToRegister} style={aStyle}>注册新账号</a></p>
                <p style={errorStyle}>{this.state.errorMessage}</p>
                {this.state.isProgress == true ? <Progress/> : ""}
            </form>
        );
    }
});

function startLogin(props) {
    url = Url.header + "/REST/Domain/login";
    //url = Url.header +"/REST/Misc/getAllProvince/"+"R0xTMTExMTFaVDExMTExMTUyMQ%3D%3D";
    //url = "http://localhost:8080/dingding/MyServlet";

    Tools.myAjax({
        type: "post",
        url, url,
        data: {telephone: "11111111111", password: "1"},
        success: function (data) {
            props.setState({isProgress: false});
            if (data.loginstate == 'true') {
                /*addCookie("username", data.name, 365, "/");
                 addCookie("token", data.token, 365, "/");
                 addCookie("state", "true", 365, "/");
                 addCookie("tel", $("#username").val(), 365, "/");
                 addCookie("id", data.id, 365, "/");*/
                console.info("登陆成功");
                showDialog("mydialog1","警告","登陆成功",true);
            } else if (data.loginstate == 'null') {
                console.error(data);
                showDialog("mydialog1","警告","请填写完整登陆信息",true);
            } else if (data.loginstate == 'false') {
                console.error(data);
                showDialog("mydialog1","警告","登陆失败",true);
            }
        }.bind(props),
        error: function (data) {
            props.setState({isProgress: false});
            console.error(data);
            showDialog("mydialog1","警告","登陆失败",true);
        }.bind(props)
    });
}
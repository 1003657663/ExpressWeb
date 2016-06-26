/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名组件
 */
var NameLogin = React.createClass({displayName: "NameLogin",
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
            this.props.onError("");
            this.setState({nameText: value});
            if (this.props.hanleChange != undefined) {
                this.props.hanleChange(value);
            }
        }
    },
    render: function () {
        return (
            React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", 
                   onChange: this.handleNameChange})
        );
    }
});
/**
 * 电话号组件
 */
var Tel = React.createClass({displayName: "Tel",
    getInitialState: function () {
        return {telephone: ""};
    },
    handleChange: function (event) {
        var telNum = event.target.value;
        if (Tools.isNum(telNum)) {
            if (telNum.length > 11) {
                this.props.onError("电话号长度11位");
            } else {
                this.props.onError("");
                if (this.props.handleChange != undefined) {
                    this.props.handleChange(telNum);
                }
                this.setState({telephone: telNum});
            }
        } else {
            if (this.props.onError != null) {
                this.props.onError("电话号必须是数字");
            }
        }

    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "text", value: this.state.telephone, onChange: this.handleChange, placeholder: "电话号", 
                       className: "login_tel"})
            )
        );
    }
});

/**
 * 密码组件
 */
var Password = React.createClass({displayName: "Password",
    getInitialState: function () {
        return {password: ""};
    },
    handleChange: function (event) {
        if (this.props.handleChange != undefined) {
            this.props.handleChange(event.target.value);
        }
        this.setState({password: event.target.value});
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "password", placeholder: "密码", onChange: this.handleChange, value: this.state.password, 
                       className: "login_password"})
            )
        );
    }
});

/**
 * 关闭按钮
 */
var CloseButton = React.createClass({displayName: "CloseButton",
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
            React.createElement("img", {className: "login_close", onClick: this.handleClick, onMouseOver: this.handleMouseOve, 
                 onMouseOut: this.handleMouseOu, src: this.state.src})
        );
    }
});

/**
 * 空组件
 */
var EmptyComponent = React.createClass({displayName: "EmptyComponent",
    render: function () {
        return null;
    }
});

/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    getInitialState: function () {
        var temp;
        if (this.props.isLogin != undefined && this.props.isLogin == "true") {
            temp = {isLogin: true}
        } else {
            temp = {isLogin: false}
        }
        return Tools.extend(temp, {
            telephone: "15038290935", password: "123456", name: "",
            errorMessage: "", isProgress: -1
        });
    },
    handleSubmitClick: function (event) {
        //这里开始登陆
        var config = {
            telephone: this.state.telephone,
            password: this.state.password,
            name: this.state.name
        };
        if (config.telephone.length != 11) {
            this.handleError("电话号码长度错误");
            return;
        }
        setTimeout(function () {
            if (this.state.isProgress == -1 && this.isMounted()) {
                this.setState({isProgress: true});
            }
        }.bind(this), 800);
        startLogin(this, config, this.state.isLogin, this.onSuccess);
    },
    handleSubmitStart: function (event) {
        event.preventDefault();
    },
    handleToRegister: function () {
        ReactDOM.render(
            React.createElement(Login, {isLogin: "false", key: "noLogin"}),
            document.getElementById("login_container")
        );
    },
    handleError: function (message) {
        this.setState({errorMessage: message});
    },
    onClose: function () {
        ReactDOM.render(React.createElement(EmptyComponent, null), document.getElementById("login_container"));
    },
    onSuccess: function () {
        ReactDOM.render(
            React.createElement(Content, {update: true}),
            document.getElementById("content")
        );
        this.onClose();
    },
    //回收参数
    handleTelChange: function (telephone) {
        this.setState({telephone: telephone});
    },
    handlePasswordChange: function (password) {
        this.setState({password: password});
    },
    handleNameChange: function (name) {
        this.setState({name: name});
    },
    render: function () {
        var h3Style = {textAlign: "center", width: "100%", paddingBottom: "10px"};
        var aStyle = {color: "#2aabd2"};
        var errorStyle = {color: "red"};
        var nameCom;
        if (this.state.isLogin) {
            nameCom = undefined;
        } else {
            nameCom = React.createElement(NameLogin, {hanleChange: this.handleNameChange, onError: this.handleError});
        }
        return (
            React.createElement("form", {onSubmit: this.handleSubmitStart, method: "get", className: "login_window"}, 
                React.createElement(CloseButton, {onClose: this.onClose}), 
                React.createElement("h3", {style: h3Style}, "登陆"), 
                React.createElement(Tel, {handleChange: this.handleTelChange, onError: this.handleError}), 
                nameCom, 
                React.createElement(Password, {handleChange: this.handlePasswordChange, onError: this.handleError}), 
                React.createElement("div", null, React.createElement("input", {type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"})
                ), 
                React.createElement("p", null, "还没有账号?", React.createElement("a", {href: "#", onClick: this.handleToRegister, style: aStyle}, "注册新账号")), 
                React.createElement("p", {style: errorStyle}, this.state.errorMessage), 
                this.state.isProgress == true ? React.createElement(Progress, null) : ""
            )
        );
    }
});

function startLogin(props, config, isLogin, onSuccess) {
    if (isLogin) {//-------登陆
        var url = "/REST/Domain/login";

        Tools.myAjax({
            type: "post",
            url, url,
            data: {telephone: config.telephone, password: config.password},
            success: function (data) {
                props.setState({isProgress: false});
                if (data.loginstate == 'true') {
                    /*addCookie("username", data.name);
                    addCookie("token", data.token);
                    addCookie("isLogin", "true");
                    addCookie("tel", config.telephone);
                    addCookie("id", data.id);*/

                    doSuccess(data);
                    showDialog("dialog", "恭喜", "登陆成功", true, onSuccess);

                } else if (data.loginstate == "deny") {
                    showDialog("dialog", "警告", "电话号码长度错误", true);
                } else if (data.loginstate == 'null') {
                    showDialog("dialog", "警告", "请填写完整登陆信息", true);
                } else {
                    showDialog("dialog", "警告", "登陆失败,请重试", true);
                }
            }.bind(props),
            error: function (data) {

                props.setState({isProgress: false});
                console.error(data);
                showDialog("dialog", "警告", "登陆失败" + data.state(), true);

            }.bind(props)
        });
    } else {//------注册
        var url = "/REST/Domain/register";

        Tools.myAjax({
            type: "post",
            url, url,
            data: {telephone: config.telephone, password: config.password, name: config.name},
            success: function (data) {
                props.setState({isProgress: false});
                if (data.registerstate == 'true') {
                    doSuccess(data);
                    showDialog("dialog", "恭喜", "注册成功", true, onSuccess);
                } else if (data.registerstate == 'deny') {
                    showDialog("dialog", "警告", "手机号已经注册过,请登录");
                } else if (data.registerstate == 'null') {
                    showDialog("dialog", "警告", "请填写完整登陆信息", true);
                } else {
                    showDialog("dialog", "警告", "注册失败", true);
                }
            }.bind(props),
            error: function (data) {
                props.setState({isProgress: false});
                console.error(data);
                showDialog("dialog", "警告", "注册失败", true);
            }.bind(props)
        });
    }

    function doSuccess(data) {
        var name = data.name;
        if (data.name == undefined) {
            name = config.name;
        }
        addCookie("username", name);
        addCookie("token", data.token);
        addCookie("isLogin", "true");
        addCookie("telephone", config.telephone);
        addCookie("password",config.password);
        addCookie("id", data.id);

        User.login(name, config.telephone, config.password, data.token, data.id);

    }
}
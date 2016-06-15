/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名组件
 */
var NameLogin = React.createClass({displayName: "NameLogin",
    getInitialState: function () {
        return {nameText:""}
    },
    handleNameChange: function (event) {
        var value = event.target.value;
        if(value.length>6){
            if(this.props.onError!=null){
                this.props.onError("姓名太长");
            }
        }else{
            this.setState({nameText:value});
            if(this.props.sendToParent != undefined) {
                this.props.sendToParent({nameText:value});
            }
        }
    },
    render: function () {
        return (
            React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", onChange: this.handleNameChange})
        );
    }
});
/**
 * 电话号组件
 */
var Tel = React.createClass({displayName: "Tel",
    getInitialState: function () {
        return {telephone:""};
    },
    handleChange: function (event) {
        var telNum = event.target.value;
        if(Tools.isNum(telNum)){
            if(this.props.sendToParent!=undefined){
                this.props.sendToParent({telephone:telNum});
            }
            this.setState({telephone:telNum});
        }else{
            if(this.props.onError!=null){
                this.props.onError("电话号必须是数字");
            }
        }

    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "text", value: this.state.telephone, onChange: this.handleChange, placeholder: "电话号", className: "login_tel"})
            )
        );
    }
});

/**
 * 密码组件
 */
var Password = React.createClass({displayName: "Password",
    getInitialState: function () {
        return {password:""};
    },
    handleChange: function (event) {
        if(this.props.sendToParent!=undefined){
            this.props.sendToParent({password:event.target.value});
        }
        this.setState({password:event.target.value})
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("input", {type: "password", placeholder: "密码", onChange: this.handleChange, value: this.state.password, className: "login_password"})
            )
        );
    }
});
/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    getInitialState: function () {
        var temp;
        if(this.props.isLogin!=undefined && this.props.isLogin == "true") {
            temp = {isLogin: true}
        }else{
            temp = {isLogin: false}
        }
        return Tools.extend(temp,{errorMessage:""});
    },
    handleSubmitClick: function (event) {

        //这里开始登陆
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
    sendToParent: function (data) {
        this.state = Tools.extend(this.state,data);
        console.info(this.state);
    },
    handleError: function (message) {
        this.setState({errorMessage:message});
    },
    render: function () {
        var h3Style = {textAlign:"center",width:"100%",paddingBottom:"10px"};
        var aStyle = {color:"#2aabd2"};
        var errorStyle={color:"red"};
        var nameCom;
        if(this.state.isLogin){
            nameCom = undefined;
        }else{
            nameCom = React.createElement(NameLogin, {sendToParent: this.sendToParent, onError: this.handleError});
        }
        return (
            React.createElement("form", {onSubmit: this.handleSubmitStart, method: "get", className: "login_window"}, 
                React.createElement("img", {src: "../images/close.png"}), 
                React.createElement("h3", {style: h3Style}, "登陆"), 
                React.createElement(Tel, {sendToParent: this.sendToParent, onError: this.handleError}), 
                nameCom, 
                React.createElement(Password, {sendToParent: this.sendToParent, onError: this.handleError}), 
                React.createElement("div", null, React.createElement("input", {type: "submit", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"})), 
                React.createElement("p", null, "还没有账号?", React.createElement("a", {href: "#", onClick: this.handleToRegister, style: aStyle}, "注册新账号")), 
                React.createElement("p", {style: errorStyle}, this.state.errorMessage)
            )
        );
    }
});
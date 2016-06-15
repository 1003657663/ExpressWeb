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
        if(value>6){
            //this.setState({nameErrorMessage:"长度过长"});
        }else{
            this.setState({nameText:value});
        }
    },
    render: function () {
        return (
            React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", onChange: this.handleNameChange})
        );
    }
});
/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    getInitialState: function () {
        if(this.props.isLogin!=undefined && this.props.isLogin) {
            return {nameText: "", nameErrorMessage: "", isLogin: true}
        }else{
            return {nameText: "", nameErrorMessage: "", isLogin: false}
        }
        alert(this.props.isLogin);
    },
    handleSubmitClick: function (event) {
        alert("denglu");
        //这里开始登陆
    },
    handleSubmitStart: function (event) {
        event.preventDefault();
    },
    render: function () {
        var h3Style = {textAlign:"center",width:"100%",paddingBottom:"20px"};
        var nameCom;
        if(this.state.isLogin){
            nameCom = React.createElement(NameLogin, null);
        }else{
            nameCom = undefined;
        }
        return (
            React.createElement("form", {onSubmit: this.handleSubmitStart, method: "get", action: "www.baidu.com", className: "login_window"}, 
                React.createElement("h3", {style: h3Style}, "登陆"), 
                React.createElement("div", null, 
                    React.createElement("input", {type: "text", placeholder: "电话号", className: "login_tel"})
                ), 
                nameCom, 
                React.createElement("div", null, 
                    React.createElement("input", {type: "password", placeholder: "密码", className: "login_password"})
                ), 
                React.createElement("div", null, React.createElement("input", {type: "submit", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"}))
            )
        );
    }
});
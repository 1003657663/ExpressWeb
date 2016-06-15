/**
 * Created by songchao on 16/6/14.
 */
/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    getInitialState: function () {
        return {nameText:"",nameErrorMessage:""}
    },
    handleNameChange: function (event) {
        var value = event.target.value;
        if(value>6){
            this.setState({nameErrorMessage:"长度过长"});
        }else{
            this.setState({nameText:value});
        }
    },
    handleSubmitClick: function (event) {
        alert("denglu");
    },
    handleSubmitStart: function () {
        alert("start sub");
    },
    render: function () {
        var h3Style = {textAlign:"center",width:"100%",paddingBottom:"20px"};
        return (
            React.createElement("form", {className: "login_window"}, 
                React.createElement("h3", {style: h3Style}, "登陆"), 
                React.createElement("div", null, 
                    React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", onChange: this.handleNameChange}), 
                    React.createElement("label", null, this.state.nameErrorMessage)
                ), 
                React.createElement("div", null, 
                    React.createElement("input", {type: "password", placeholder: "密码", className: "login_password"})
                ), 
                React.createElement("div", null, React.createElement("input", {type: "submit", className: "login_submit", onClick: this.handleSubmitClick, onSubmit: this.handleSubmitStart, defaultValue: "提交"}))
            )
        );
    }
});
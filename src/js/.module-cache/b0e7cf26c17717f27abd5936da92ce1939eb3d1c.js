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
    render: function () {
        return (
            React.createElement("form", {method: "get", className: "login_window"}, 
                React.createElement("div", null, 
                    React.createElement("input", {type: "text", value: this.state.nameText, className: "login_name", placeholder: "姓名", onChange: this.handleNameChange}), 
                    React.createElement("label", null, this.state.nameErrorMessage)
                ), 
                React.createElement("div", null, 
                    React.createElement("input", {type: "password", placeholder: "密码", className: "login_password"})
                ), 
                React.createElement("div", null, React.createElement("input", {type: "submit", className: "login_submit", defaultValue: "提交"}))
            )
        );
    }
});
/**
 * Created by songchao on 16/6/23.
 */


var ChangePassword = React.createClass({displayName: "ChangePassword",
    getInitialState: function () {
        return {
            oldPassword:"",
            newPassword1:"",
            newPassword2:"",
            errorMessage:"",
        }
    },
    handleSubmitClick: function () {
        if(this.state.oldPassword != User.password){
            this.setState({errorMessage:"新密码错误,请重新输入"});
            return;
        }
        Tools.myAjax({
            
        })
    },
    handleBlur: function (e) {
        if(this.state.newPassword1 != this.state.newPassword2 || this.state.newPassword1==""){
            this.setState({errorMessage:"新旧密码不一致,请重新输入"});
        }else{
            this.setState({errorMessage:""});
        }
    },
    onChangeOld: function (e) {
        this.setState({oldPassword:e.target.value});
    },
    onChangeNew1: function (e) {
        this.setState({newPassword1:e.target.value});
    },
    onChangeNew2: function (e) {
        this.setState({newPassword2:e.target.value});
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        var pStyle = {textAlign:"center",color:"red"};
        return (
            React.createElement("div", {className: "address_container"}, 
                React.createElement("div", {className: "address_head"}, 
                    React.createElement("span", null, "修改密码")
                ), 

                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeOld, value: this.state.oldPassword, placeholder: "请输入旧密码"}), 
                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeNew1, value: this.state.newPassword1, placeholder: "请输入新密码"}), 
                React.createElement("input", {type: "password", className: "login_password", onChange: this.onChangeNew2, value: this.state.newPassword2, onBlur: this.handleBlur, placeholder: "请再次输入新密码"}), 
                React.createElement("input", {type: "button", className: "login_submit", onClick: this.handleSubmitClick, defaultValue: "提交"}), 
                React.createElement("p", {style: pStyle}, this.state.errorMessage), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick})
            )
        );
    }
});
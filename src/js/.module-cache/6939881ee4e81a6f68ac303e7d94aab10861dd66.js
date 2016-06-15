/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名输入框
 */
var NameInput = React.createClass({displayName: "NameInput",
    getInitialState: function () {
        return {i_val:""}
    },
    handleChange: function (event) {
        var val = event.target.value;
        if(val.length > 6){
            this.setState({i_val:val.substring(0,6),errorMessage:"用户名不能超过6位"});
        }else{
            this.setState({"i_val":val,errorMessage:""});
        }
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", null, "姓名:"), 
                React.createElement("input", {type: "text", value: this.state.i_val, onChange: this.handleChange}), 
                React.createElement("label", null, this.state.errorMessage)
            )
        );
    }
});

/**
 * 密码输入框
 */
var PasswordInput = React.createClass({displayName: "PasswordInput",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", null, "密码:"), React.createElement("input", {type: "password"})
            )
        )
    }
});

/**
 * 提交按钮
 */
var SubmitButton = React.createClass({displayName: "SubmitButton",
    render: function () {
        return (
            React.createElement("input", {type: "submit"})
        );
    }
});

/**
 * 登陆组件
 */
var Login = React.createClass({displayName: "Login",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("form", {method: "get"}, 
                    React.createElement("div", null, 
                        React.createElement("label", null, "姓名:"), 
                        React.createElement("input", {type: "text", value: this.state.i_val, onChange: this.handleChange}), 
                        React.createElement("label", null, this.state.errorMessage)
                    ), 
                    React.createElement("div", null, 
                        React.createElement("label", null, "密码:"), React.createElement("input", {type: "password"})
                    ), 
                    React.createElement("div", null, React.createElement("input", {type: "submit"}))
                )
            )
        );
    }
});
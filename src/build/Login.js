/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名输入框
 */
var NameInput = React.createClass({
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
            <div>
                <label>姓名:</label>
                <input type="text" value={this.state.i_val} onChange={this.handleChange}/>
                <label>{this.state.errorMessage}</label>
            </div>
        );
    }
});

/**
 * 密码输入框
 */
var PasswordInput = React.createClass({
    render: function () {
        return (
            <div>
                <label>密码:</label><input type="password"/>
            </div>
        )
    }
});

/**
 * 提交按钮
 */
var SubmitButton = React.createClass({
    render: function () {
        return (
            <input type="submit"/>
        );
    }
});

/**
 * 登陆组件
 */
var Login = React.createClass({
    render: function () {
        return (
            <div>
                <p>登陆</p>
                <form method="get">
                    <NameInput/>
                    <PasswordInput/>
                    <SubmitButton/>
                </form>
            </div>
        );
    }
});
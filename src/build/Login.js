/**
 * Created by songchao on 16/6/14.
 */
/**
 * 登陆组件
 */
var Login = React.createClass({
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
            <form method="get" className="login_window">
                <div>
                    <label>姓名:</label>
                    <input type="text" value={this.state.nameText} onChange={this.handleNameChange}/>
                    <label>{this.state.nameErrorMessage}</label>
                </div>
                <div>
                    <label>密码:</label><input type="password"/>
                </div>
                <div><input type="submit"/></div>
            </form>
        );
    }
});
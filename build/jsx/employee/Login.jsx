/**
 * Created by songchao on 16/6/14.
 */
/**
 * 姓名组件
 */
var NameLogin = React.createClass({
    getInitialState: function () {
        return {
            nameText: "",
            workType:"",
            site:"",
        }
    },
    handleNameChange: function (event) {
        var value = event.target.value;
        if (value.length > 20) {
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
    handleTypeChange: function (e) {
        if(e.target.value!=0){
            this.setState({workType:e.target.value});
            console.info(e.target.value);
            this.props.handleWorkTypeChange(e.target.value);
        }
    },
    handleSiteChange: function (e) {
        this.setState({site:e.target.value});
        this.props.handleSiteChange(e.target.value);
    },
    render: function () {
        return (
            <div>
                <input type="text" value={this.state.nameText} className="login_name" placeholder="姓名"
                       onChange={this.handleNameChange}/>
                <select value={this.state.workType} onChange={this.handleTypeChange} className="form-control">
                    <option value="0">请选择职位</option>
                    <option value="1">快递员</option>
                    <option value="2">分拣员</option>
                    <option value="3">司机</option>
                    <option value="4">经理</option>
                </select>
                <input type="text" value={this.state.site} className="login_name" placeholder="站点"
                       onChange={this.handleSiteChange}/>
            </div>
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
        if (this.props.handleChange != undefined) {
            this.props.handleChange(event.target.value);
        }
        this.setState({password: event.target.value});
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
        return Tools.extend(temp, {
            telephone: "15038290935", password: "123456", name: "",workType:"",site:"",
            errorMessage: ""
        });
    },
    handleSubmitClick: function (event) {
        //这里开始登陆
        var config = {
            telephone: this.state.telephone,
            password: this.state.password,
            name: this.state.name,
            workType:this.state.workType,
            site:this.state.site,
        };
        if (config.telephone.length != 11) {
            this.handleError("电话号码长度错误");
            return;
        }
        if(!this.state.isLogin && (this.state.workType == "" || this.state.site == "")){
            this.handleError("请填写完整");
            return;
        }
        startLogin(this, config, this.state.isLogin, this.onSuccess);
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
    handleError: function (message) {
        this.setState({errorMessage: message});
    },
    onClose: function () {
        ReactDOM.render(<EmptyComponent/>, document.getElementById("login_container"));
    },
    onSuccess: function () {
        ReactDOM.render(
            <Content update={true}/>,
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
    handleWorkTypeChange: function (type) {
        this.setState({workType:type});
    },
    handleSiteChange: function (site) {
        this.setState({site:site});
    },
    render: function () {
        var h3Style = {textAlign: "center", width: "100%", paddingBottom: "10px"};
        var aStyle = {color: "#2aabd2"};
        var errorStyle = {color: "red"};
        var nameCom;
        var head = "";
        if (this.state.isLogin) {
            nameCom = undefined;
            head = "登陆";
        } else {
            nameCom = <NameLogin handleWorkTypeChange={this.handleWorkTypeChange} handleSiteChange={this.handleSiteChange} hanleChange={this.handleNameChange} onError={this.handleError}/>;
            head = "注册";
        }
        return (
            <form onSubmit={this.handleSubmitStart} method="get" className="login_window">
                <CloseButton onClose={this.onClose}/>
                <h3 style={h3Style}>{head}</h3>
                <Tel handleChange={this.handleTelChange} onError={this.handleError}/>
                {nameCom}
                <Password handleChange={this.handlePasswordChange} onError={this.handleError}/>
                <div><input type="button" className="login_submit" onClick={this.handleSubmitClick} defaultValue="提交"/>
                </div>
                <p>还没有账号?<a href="#" onClick={this.handleToRegister} style={aStyle}>注册新账号</a></p>
                <p style={errorStyle}>{this.state.errorMessage}</p>
            </form>
        );
    }
});

function startLogin(props, config, isLogin, onSuccess) {
    if (isLogin) {//-------登陆
        var url = "/REST/Domain/loginByEmployee";

        Tools.myAjax({
            type: "post",
            url:url,
            data: {telephone: config.telephone, password: config.password},
            success: function (data) {
                if (data.loginstate == 'true') {
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
                console.error(data);
                showDialog("dialog", "警告", "登陆失败" + data.state(), true);

            }.bind(props)
        });
    } else {//------注册
        var url = "/REST/Domain/newEmployee";
        var jobText = "";
        if(config.workType == '1'){
            jobText = "快递员";
        }else if(config.workType == '2'){
            jobText = "分拣员";
        }else if(config.workType == '3'){
            jobText = "司机";
        }else if(config.workType == '4'){
            jobText = "经理";
        }
        Tools.myAjax({
            type: "post",
            url:url,
            data: {telephone: config.telephone, password: config.password, name: config.name,job:config.workType,jobText:jobText,status:"1",outletsId:"1"},
            success: function (data) {
                if (data.newEmployee == 'true') {
                    doSuccess(data);
                    showDialog("dialog", "恭喜", "注册成功", true, onSuccess);
                }
                 else {
                    showDialog("dialog", "警告", "注册失败", true);
                }
            }.bind(props),
            error: function (data) {
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
        addCookie("employee_username", name);
        addCookie("employee_token", data.token);
        addCookie("employee_isLogin", "true");
        addCookie("employee_name",name);
        addCookie("employee_telephone", config.telephone);
        addCookie("employee_password", config.password);
        addCookie("employee_id", data.id);
        addCookie("employee_text", data.jobText);
        addCookie("employee_job",data.job);
        addCookie("employee_outletsId",data.outletsId);
        addCookie("employee_status",data.status);

        User.login(
            name, config.telephone, config.password, data.token, data.id,
            data.job,data.jobText,data.outletsId,data.status
        );

    }
}
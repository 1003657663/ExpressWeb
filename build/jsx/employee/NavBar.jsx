/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({
    getInitialState: function () {
        return {value: ""};
    },
    handleClick: function () {
        var id = this.state.value;
        if(User.Package == null){
            showDialog("dialog","警告","请在打包或者拆包界面使用搜索框",true);
            return;
        }

        User.Package.addExpress(id);
        //----这里执行网络操作---ajax---检查快递是否在数据库中
        /*Tools.myAjax({
            type: "get",
            url: "/Domain/checkExpressIfExisit/"+id,
            success: function (data) {
                if(data.state == "1") {

                }else{
                    showDialog("dialog","警告","这个快递号不是一个已经存在的快递,请检查是否正确",true);
                }
            },
            error: function (data) {
                showDialog("dialog","错误","检查快递存在性出错,请重试",true);
            }
        })*/
    },
    handleInputChange: function (event) {
        var inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            this.setState({value: inputValue});
        }
    },
    onKeyDown: function (e) {
        if (e.which == 13) {
            this.handleClick();
            e.preventDefault();
        }
    },
    render: function () {
        return (
            <form className="searchForm" method="get" onKeyPress={this.onKeyDown}>
                <span>
                    <img src="../images/address/add_on.png" width="15px" height="15px" className="em_searchIcon"
                         onClick={this.handleClick}/>
                </span>
                <input type="text" className="searchInput" value={this.state.value} placeholder="搜索"
                       onChange={this.handleInputChange}/>
            </form>
        );
    }
});

/**
 * 左边商标
 */
var LeftBrand = React.createClass({
    render: function () {
        return (
            <div className="brand_container">
                <div className="brandicon_container">
                    <img src="../images/github-pure.png" className="brand_icon"/>
                </div>
                <p className="brand_name">快递吧</p>
            </div>
        );
    }
});

/**
 * 右边登录注册按钮
 */
var LoginAndReg = React.createClass({
    getInitialState: function () {
        User.NavBar = this;
        return {isLogin: User.isLogin}
    },
    handleLoginClick: function () {
        ReactDOM.render(
            <Login isLogin="true" key="isLogin"/>,
            document.getElementById("login_container")
        );
    },
    handleLogout: function () {
        //注销
        User.logout();
        User.Main.onCloseClick([true]);
    },
    render: function () {
        var chil;
        if (this.state.isLogin) {
            chil =
                (<a href="#" onClick={this.handleLogout}>
                    <span className="glyphicon glyphicon-user"></span>
                    注销
                </a>);
        } else {
            chil =
                (<a href="#" onClick={this.handleLoginClick}>
                    <span className="glyphicon glyphicon-user"></span>
                    登录
                </a>);
        }
        return (
            <div className="loginAndReg">
                {chil}
            </div>
        );
    }
});

/**
 * 顶部导航栏
 */
var NavBar = React.createClass({
    render: function () {
        return (
            <nav className="nav_bar">
                <LeftBrand />
                <SearchInput/>
                <LoginAndReg />
            </nav>
        );
    }
});
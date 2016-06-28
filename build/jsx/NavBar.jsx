/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({
    getInitialState: function () {
        return {value: "94694271472975"};
    },
    handleClick: function () {
        var id = this.state.value;
        if (id.length < 11 || isNaN(id)) {
            showDialog("dialog", "警告", "快递单号错误", true);
            return;
        }
        //----这里执行网络操作---ajax---
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getExpresslogisticsInfosByExpressId/" + this.state.value,
            success: function (data) {
                if (data.length == 0) {
                    showDialog("dialog", "警告", "您查的快递号还没有物流信息",true);
                    return;
                }
                                                      
                User.Main.setState({
                    child: [
                        <UserInfo key="userinfo"/>,
                        <SearchResult key="searchresult" searchID={id} searchResult={data} />,
                    ]
                });
            },
            error: function (data) {
                console.error(data);
            }
        })
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
                    <img src="../images/searchIcon.png" width="15px" height="15px" className="searchIcon"
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
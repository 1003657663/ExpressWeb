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
        //获取值
        alert(this.state.value);
        //----这里执行网络操作---ajax---
    },
    handleInputChange: function (event) {
        var inputValue = event.target.value;
        if (!isNaN(inputValue)) {
            this.setState({value: inputValue});
        }
    },
    render: function () {
        return (
            <form className="searchForm" method="get">
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
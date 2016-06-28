/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({displayName: "SearchInput",
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
            React.createElement("form", {className: "searchForm", method: "get", onKeyPress: this.onKeyDown}, 
                React.createElement("span", null, 
                    React.createElement("img", {src: "../images/address/add_on.png", width: "15px", height: "15px", className: "em_searchIcon", 
                         onClick: this.handleClick})
                ), 
                React.createElement("input", {type: "text", className: "searchInput", value: this.state.value, placeholder: "搜索", 
                       onChange: this.handleInputChange})
            )
        );
    }
});

/**
 * 左边商标
 */
var LeftBrand = React.createClass({displayName: "LeftBrand",
    render: function () {
        return (
            React.createElement("div", {className: "brand_container"}, 
                React.createElement("div", {className: "brandicon_container"}, 
                    React.createElement("img", {src: "../images/github-pure.png", className: "brand_icon"})
                ), 
                React.createElement("p", {className: "brand_name"}, "快递吧")
            )
        );
    }
});

/**
 * 右边登录注册按钮
 */
var LoginAndReg = React.createClass({displayName: "LoginAndReg",
    getInitialState: function () {
        User.NavBar = this;
        return {isLogin: User.isLogin}
    },
    handleLoginClick: function () {
        ReactDOM.render(
            React.createElement(Login, {isLogin: "true", key: "isLogin"}),
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
                (React.createElement("a", {href: "#", onClick: this.handleLogout}, 
                    React.createElement("span", {className: "glyphicon glyphicon-user"}), 
                    "注销"
                ));
        } else {
            chil =
                (React.createElement("a", {href: "#", onClick: this.handleLoginClick}, 
                    React.createElement("span", {className: "glyphicon glyphicon-user"}), 
                    "登录"
                ));
        }
        return (
            React.createElement("div", {className: "loginAndReg"}, 
                chil
            )
        );
    }
});

/**
 * 顶部导航栏
 */
var NavBar = React.createClass({displayName: "NavBar",
    render: function () {
        return (
            React.createElement("nav", {className: "nav_bar"}, 
                React.createElement(LeftBrand, null), 
                React.createElement(SearchInput, null), 
                React.createElement(LoginAndReg, null)
            )
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({displayName: "SearchInput",
    getInitialState: function () {
        return {value:""};
    },
    handleClick: function () {
        //获取值
        alert(this.state.value);
        //----这里执行网络操作---ajax---
    },
    handleInputChange: function (event) {
        var inputValue = event.target.value;
        if(!isNaN(inputValue)){
            this.setState({value:inputValue});
        }
    },
    render: function () {
        return (
            React.createElement("form", {className: "searchForm", method: "get"}, 
                React.createElement("span", null, 
                    React.createElement("img", {src: "../images/searchIcon.png", width: "15px", height: "15px", className: "searchIcon", onClick: this.handleClick})
                ), 
                React.createElement("input", {type: "text", className: "searchInput", value: this.state.value, placeholder: "搜索", onChange: this.handleInputChange})
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
    handleLoginClick: function () {
        ReactDOM.render(
            React.createElement(Login, {isLogin: "true"}),
            document.getElementById("login_container")
        );
    },
    render: function () {
        return (
            React.createElement("div", {className: "loginAndReg"}, 
                React.createElement("a", {href: "#", onClick: this.handleLoginClick}, 
                    React.createElement("span", {className: "glyphicon glyphicon-user"}), 
                    "登录"
                )
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
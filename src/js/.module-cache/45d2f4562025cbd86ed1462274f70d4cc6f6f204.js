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
            React.createElement("div", null, 
                React.createElement("div", null, 
                    React.createElement("img", {src: "../images/brand.png"})
                ), 
                React.createElement("div", null)
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
            React.createElement("nav", null, 
                React.createElement(SearchInput, null)
            )
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */
/**
 * 搜索框
 */
var SearchInput = React.createClass({
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
            <form className="searchForm" method="get">
                <span>
                    <img src="../images/searchIcon.png" width="15px" height="15px" className="searchIcon" onClick={this.handleClick} />
                </span>
                <input type="text" className="searchInput" value={this.state.value} placeholder="搜索" onChange={this.handleInputChange} />
            </form>
        );
    }
});

/**
 * 左边商标
 */

/**
 * 顶部导航栏
 */
var NavBar = React.createClass({
    render: function () {
        return (
            <nav>
                <SearchInput/>
            </nav>
        );
    }
});
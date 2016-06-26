/**
 * Created by songchao on 16/6/26.
 */

/**
 * 打包和拆包的容器
 */
var Package = React.createClass({displayName: "Package",
    propTypes: {
        isPackageIn:React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            expresses:["13245648","54444568798","8678746545"],
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    componentDidMount: function () {
        
    },
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {key: "headtext", className: "address_head"}, 
                    React.createElement("span", null, this.props.isPackageIn?"快件打包":"快件拆包")
                ), 
                React.createElement("ul", {key: "packagelist", className: "package_list"}, 
                    this.state.expresses.length==0?React.createElement("li", null, "请在顶部搜索框输入并点击+添加"):"", 
                    this.state.expresses.map(function (data, index) {
                        return React.createElement("li", {key: index}, data)
                    })
                ), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick, key: "beforebutton"})
            )
        );
    }
});



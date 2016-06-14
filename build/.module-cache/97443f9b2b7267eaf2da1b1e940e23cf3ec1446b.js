/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    getInitialState: function () {
        return {value:"hello"}
    },
    handleClick : function (event) {
        this.setState({
            value:event.target.value
        });
    },
    render: function () {
        return (
            React.createElement("div", {ref: "mydiv"}, 
                React.createElement("input", {type: "text", value: value, onchange: ""}), 
                React.createElement("p", null, value)
            )
        )
    }
});
var NodeList = React.createClass({displayName: "NodeList",
    render: function () {
        return (
            React.createElement("ol", null, 
                
                    React.Children.map(this.props.children,function (child) {
                        return React.createElement("li", null, child);
                    })
                
            )
        )
    }
});
ReactDOM.render(
    React.createElement(Mydiv, null),
    document.getElementById("content")
);
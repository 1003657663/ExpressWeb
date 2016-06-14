/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    propTypes: function () {
        title
    },
    render: function () {
        return React.createElement("div", null, this.props.title)
    }
})
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
    React.createElement(NodeList, null, 
        React.createElement("h1", null, "111"), 
        React.createElement("h1", null, "222")
    ),
    document.getElementById("content")
);
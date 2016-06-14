/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    propTypes: function () {
        title: React.PropTypes.string.isRequired
    },
    render: function () {
        return React.createElement("div", null, this.props.title)
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
    React.createElement(Mydiv, {title: "123"}),
    document.getElementById("content")
);
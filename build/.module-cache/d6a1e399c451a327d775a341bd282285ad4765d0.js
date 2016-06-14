/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    propTypes: {
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
var data = "123";
ReactDOM.render(
    React.createElement(Mydiv, {title: data}),
    document.getElementById("content")
);
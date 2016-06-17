/**
 * Created by songchao on 16/6/16.
 */

var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (
            React.createElement("div", {className: "footer"}, 
                React.createElement("ul", null, 
                    React.createElement("li", null, "关于我们"), 
                    React.createElement("li", null, "隐私")
                )
            )
        );
    }
});
/**
 * Created by songchao on 16/6/16.
 */

var Footer = React.createClass({displayName: "Footer",
    render: function () {
        return (
            React.createElement("ul", {className: "footer"}, 
                React.createElement("li", null, "关于我们"), 
                React.createElement("li", null, "隐私")
            )
        );
    }
});
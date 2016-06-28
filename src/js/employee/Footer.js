/**
 * Created by songchao on 16/6/16.
 */

var Footer = React.createClass({displayName: "Footer",
    onAboutClick:function () {
        var child = [
            React.createElement(AboutOus, {key: "aboutous", onCloseClick: this.props.onCloseClick})
        ];
        this.props.onCloseClick(child);
    },
    render: function () {
        return (
            React.createElement("div", {className: "row footer"}, 
                React.createElement("ul", null, 
                    React.createElement("li", {className: "point", onClick: this.onAboutClick}, "关于我们"), 
                    React.createElement("li", {className: "point", onClick: this.onAboutClick}, "隐私")
                )
            )
        );
    }
});
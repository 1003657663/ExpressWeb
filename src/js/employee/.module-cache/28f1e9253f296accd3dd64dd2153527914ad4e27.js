/**
 * Created by songchao on 16/6/19.
 */

/**
 * 充满中间容器的,宽度100%的,p元素
 */
var FillWidthP = React.createClass({displayName: "FillWidthP",
    render: function () {
        var classes = Tools.classSet(
            'fill_width_margin_8',
            'width_all',
            this.props.className
        );
        return (
            React.createElement("p", {className: classes, style: this.props.style}, 
                React.Children.map(this.props.children,function (child) {
                    return child;
                })
            )
        )
    }
});
/**
 * 充满中间容器的,宽度100%的div元素
 */
var FillWidthDiv = React.createClass({displayName: "FillWidthDiv",
    render: function () {
        var classes = Tools.classSet(
            'fill_width_margin',
            'width_all',
            this.props.classNames
        );
        return (
            React.createElement("div", {className: classes, style: this.props.style}, 
                React.Children.map(this.props.children,function (child) {
                    return child;
                })
            )
        )
    }
});
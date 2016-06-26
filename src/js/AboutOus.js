/**
 * Created by songchao on 16/6/22.
 */

var AboutOus = React.createClass({displayName: "AboutOus",
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(FillWidthP, null, "快递吧,一款实时跟踪的物流软件"), 
                React.createElement(BeforeButton, {onCloseClick: this.onCloseClick})
            )
        );
    }
});

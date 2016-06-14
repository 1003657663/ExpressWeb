/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    render: function () {
        return React.createElement("div", null, "My div ", this.props.kk)
    }
});
ReactDOM.render(
    React.createElement(Mydiv, {kk: "wo"}),
    document.getElementById("content")
);
/**
 * Created by chao on 2016/6/14.
 */
var NodeList = React.createClass({displayName: "NodeList",
    render: function () {
        return
        React.createElement("ol", null, 
            
                React.Children.map(function (child) {

                })
            
        )
    }
});
ReactDOM.render(
    React.createElement(Mydiv, {kk: "wo"}),
    document.getElementById("content")
);
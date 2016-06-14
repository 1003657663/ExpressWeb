/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({displayName: "Mydiv",
    getInitialState: function () {
        return {opacity:0}
    },
    componentDidMount: function () {
        this.timer = setInterval(function () {
            var state = this.state.opacity;
            state -= 0.01;
            if(state <= 0.1){
                this.setState({
                    opacity:state
                })
            }
        }.bind(this),1000);
    },
    render: function () {
        var value = this.state.value;
        return (
            React.createElement("div", {ref: "mydiv"}, 
                React.createElement("input", {type: "text", value: value, onChange: this.handleChange}), 
                React.createElement("input", {type: "text", defaultValue: "world"}), 
                React.createElement("p", null, value)
            )
        )
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
    React.createElement(Mydiv, null),
    document.getElementById("content")
);
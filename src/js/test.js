/**
 * Created by chao on 2016/6/14.
 */
var Mydiv = React.createClass({
    getInitialState: function () {
        return {opacity:0}
    },
    componentDidMount: function () {
        this.timer = setInterval(function () {
            var state = this.state.opacity;
            state -= 0.01;
            if(state <= 0.1){
                state = 1;
            }
            this.setState({
                opacity:state
            });
        }.bind(this),10);
    },
    render: function () {
        var value = this.state.value;
        return (
            <div ref="mydiv" style={{opacity:this.state.opacity}}>
                <input type="text" value={value} onChange={this.handleChange} />
                <input type="text" defaultValue="world" />
                <p>{value}</p>
            </div>
        )
    }
});
var NodeList = React.createClass({
    render: function () {
        return (
            <ol>
                {
                    React.Children.map(this.props.children,function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
        )
    }
});
ReactDOM.render(
    <Mydiv />,
    document.getElementById("content")
);
/**
 * Created by songchao on 16/6/14.
 */

/**
 * 中间所有部分容器,包括,左右
 */
var CenterComponent = React.createClass({
    render: function () {
        return (
            <div className="container-fluid center-component">
                {React.Children.map(this.props.children, function (child) {
                    return child;
                })}
            </div>
        );
    }
});

var Content = React.createClass({
    render: function () {
        var conStyle = {height: "100%"};
        return (
            <div style={conStyle}>
                <NavBar/>
                <CenterComponent>
                    <Left />
                    <Main/>
                    <Right />
                </CenterComponent>
            </div>
        )
    }
});
/**
 * 分发组件到dom树
 */
ReactDOM.render(
    <Content />,
    document.getElementById("content")
);
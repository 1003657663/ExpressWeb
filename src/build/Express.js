/**
 * Created by songchao on 16/6/14.
 */

var Content = React.createClass({
    render: function () {
        var conStyle = {height:"100%"};
        return (
            <div style={conStyle}>
                <NavBar/>
                <Main/>
                <Footer/>
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
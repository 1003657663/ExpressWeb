/**
 * Created by songchao on 16/6/14.
 */
/*var LoginContainer = React.createClass({
    render: function () {
        return (
            <div classID="login_container"></div>
        );
    }
});*/

var Content = React.createClass({
    render: function () {
        return (
            <div>
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
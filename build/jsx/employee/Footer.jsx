/**
 * Created by songchao on 16/6/16.
 */

var Footer = React.createClass({
    onAboutClick:function () {
        var child = [
            <UserInfo key="userinfo"/>,
            <AboutOus key="aboutous" onCloseClick={this.props.onCloseClick}/>
        ];
        this.props.onCloseClick(child);
    },
    render: function () {
        return (
            <div className="row footer">
                <ul>
                    <li className="point" onClick={this.onAboutClick}>关于我们</li>
                    <li className="point" onClick={this.onAboutClick}>隐私</li>
                </ul>
            </div>
        );
    }
});
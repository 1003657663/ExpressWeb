/**
 * Created by songchao on 16/6/18.
 */

/**
 * 返回上一个界面的按钮
 */
var BeforeButton = React.createClass({displayName: "BeforeButton",
    propTypes:{
        onCloseClick:React.PropTypes.func
    },
    getInitialState: function () {
        return {mouseOn:false};
    },
    handleMouseOn: function () {
        this.setState({mouseOn:!this.state.mouseOn});
    },
    render: function () {
        var onSrc = "../images/index/close_on.png";
        var outSrc = "../images/index/close.png";
        return (
            React.createElement("div", {className: "row before_button"}, 
                React.createElement("img", {src: this.state.mouseOn?onSrc:outSrc, 
                      onMouseOver: this.handleMouseOn, onMouseOut: this.handleMouseOn, 
                        onClick: this.props.onCloseClick}
                )
            )
        );
    }
});
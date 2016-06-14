/**
 * Created by songchao on 16/6/14.
 */
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: "{this.props.data"}), 
                React.createElement(CommentForm, null)
            )
        );
    }
});
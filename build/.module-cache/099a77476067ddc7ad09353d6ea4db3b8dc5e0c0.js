/**
 * Created by songchao on 16/6/14.
 */
var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                React.createElement(Comment, {author: "{comment.authos}"}, 
                    comment.text
                )
            );
        });
        return(
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        )
    }
});
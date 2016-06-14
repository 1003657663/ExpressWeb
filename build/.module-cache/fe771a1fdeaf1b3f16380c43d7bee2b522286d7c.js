/**
 * Created by songchao on 16/6/14.
 */
var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        return (
            React.createElement("div", {className: "commentList"}, 
                React.createElement(Comment, {author: "Pete"}, "This is one comment"), 
                React.createElement(Comment, {author: "Jordan"}, "This is another comment")
            )
        );
    }
});

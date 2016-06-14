/**
 * Created by songchao on 16/6/14.
 */
var CommentBox = React.createClass({displayName: "CommentBox",
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "CommentBox")
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render: function () {
        return (
            React.createElement("div", {className: "commentList"}
            )
        );
    }
});
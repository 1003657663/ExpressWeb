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

var CommentForm = React.createClass({displayName: "CommentForm",
    render: function () {
        return (
            React.createElement("form", {className: "commentForm"})
        );
    }
});


var Comment = React.createClass({displayName: "Comment",
    render: function () {
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}), 
                React.createElement("span", null)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CommentBox, {url: "/api/comments"}),
    document.getElementById("content")
);
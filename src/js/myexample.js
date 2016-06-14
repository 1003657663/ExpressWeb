/**
 * Created by songchao on 16/6/14.
 */
var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <h2>This is CommentList</h2>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <form className="commentForm">
                <h2>This is CommentForm</h2>
            </form>
        );
    }
});


var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor"></h2>
                <span></span>
            </div>
        );
    }
});


var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>CommentBox</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});
ReactDOM.render(
    <CommentBox />,
    document.getElementById("content")
);
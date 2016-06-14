/**
 * Created by songchao on 16/6/14.
 */
ReactDOM.render(
    React.createElement(CommentBox, {url: "/api/comments"}),
    document.getElementById("conent")
);
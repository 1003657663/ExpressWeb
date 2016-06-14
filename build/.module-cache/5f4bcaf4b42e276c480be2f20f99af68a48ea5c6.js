/**
 * Created by songchao on 16/6/14.
 */
var CommentList = React.createClass({displayName: "CommentList",
    render:function () {
        return (
            React.createElement("div", {className: "commentList"}, 
                "Hello world,I am a CommentList."
            )
        );
    }
});

var ComentForm = React.createClass({displayName: "ComentForm",
    render: function () {
        return (
            React.createElement("div", {className: "commentForm"}, 
                "Hello world,I am a CommentForm."
            )
        );
    }
});

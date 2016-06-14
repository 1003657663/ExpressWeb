/**
 * Created by songchao on 16/6/14.
 */
var CommentBox = React.createClass({displayName: "CommentBox",
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
    })
        ;
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: "{this.state.data}"}), 
                React.createElement(COmmentForm, null)
            )
        );
    }
});

ReactDOM.render(
    React.createElement(CommentBox, {url: "/api/comments", pollInterval: 2000}),
    document.getElementById("content")
);
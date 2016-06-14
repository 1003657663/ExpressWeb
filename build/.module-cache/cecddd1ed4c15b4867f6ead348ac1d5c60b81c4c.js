/**
 * Created by songchao on 16/6/14.
 */
var CommentBox = React.createClass({displayName: "CommentBox",
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
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
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comment"), 
                React.createElement(CommentList, {data: "{this.state.data}"}), 
                React.createElement(CommentForm, null)
            )
        );
    }
});
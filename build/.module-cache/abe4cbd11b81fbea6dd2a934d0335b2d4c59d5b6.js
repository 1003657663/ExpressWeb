/**
 * Created by songchao on 16/6/14.
 */
var Comment = React.createClass({displayName: "Comment",
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(),{sanitize:true});
        return { __}
    }
})
/**
 * Created by songchao on 16/6/22.
 */

var AboutOus = React.createClass({
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            <div>
                <FillWidthP>快递吧,一款实时跟踪的物流软件</FillWidthP>
                <BeforeButton onCloseClick={this.onCloseClick}/>
            </div>
        );
    }
});

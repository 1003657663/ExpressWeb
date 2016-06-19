/**
 * Created by songchao on 16/6/18.
 */

var ExpressHistoty = React.createClass({displayName: "ExpressHistoty",
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                React.createElement(AddressContainer, {onEditClick: this.onEditClick, isSend: false, key: "receiveaddress"}), 
                React.createElement(AddressContainer, {onEditClick: this.onEditClick, isSend: false, key: "receiveaddress"})
            )
        );
    }
});
/**
 * Created by songchao on 16/6/15.
 */
var AddressItem = React.createClass({displayName: "AddressItem",
    getDefaultProps: function () {
        return {hasEditButton: true}
    },
    propTypes: {
        onEditClick: React.PropTypes.func,
        hasEditButton: React.PropTypes.bool,
        isSend: React.PropTypes.bool,
    },
    handleEditClick: function () {
        //点击之后,把地址信息回传到main中,然后控制main进入地址编辑模块
        this.props.onEditClick(this.props);
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_item"}, 
                React.createElement("div", {className: "address_info"}, 
                    React.createElement("div", {className: "fill_width_margin_8"}, 
                        this.props.addressRank != 0 ? "" :
                            React.createElement("span", {className: "address_default_sign"}, "默认"), 
                        
                        React.createElement("span", {className: "address_user_name"}, this.props.addressUserName), 
                        React.createElement("span", {className: "address_telephone"}, this.props.addressTelephone)
                    ), 
                    React.createElement("p", {className: "fill_width_margin_8 address_city_all"}, this.props.addressAddress), 
                    React.createElement("p", {className: "fill_width_margin_8 address_detail"}, this.props.addressDetail)
                ), 
                React.createElement("div", {className: "address_edit_button"}, 
                    React.createElement("img", {src: "../images/address/edit.png", onClick: this.handleEditClick})
                )
            )
        );
    }
});

var AddressContainer = React.createClass({displayName: "AddressContainer",
    getDefaultProps: function () {
        return {isNew:false};
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        headText: React.PropTypes.string,
        addressList: React.PropTypes.array,
    },
    getInitialState: function () {
        if (this.props.addressList == undefined) {
            console.error("地址参数有误,list为undefined");
            return;
        }
        return {addImg:"../images/address/add.png"};
    },
    handleAddImgOn: function () {
        this.setState({addImg:"../images/address/add_on.png"});
    },
    handleAddImgOut: function () {
        this.setState({addImg:"../images/address/add.png"});
    },
    handleAddImgClick: function () {
        this.props.onEditClick({isNew:true,isSend:this.props.isSend});
    },
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "address_head"}, 
                    React.createElement("span", null, this.props.headText), 
                    React.createElement("img", {title: "新增", onClick: this.handleAddImgClick, onMouseOver: this.handleAddImgOn, onMouseOut: this.handleAddImgOut, className: "address_add_img", src: this.state.addImg})
                ), 
                this.props.addressList.map(function (address, index) {
                    return (
                        React.createElement(AddressItem, React.__spread({
                            key: "addressitem"+index}, 
                            address, 
                            {isSend: this.props.isSend, 
                            onEditClick: this.props.onEditClick, 
                            addressUserName: address.name, 
                            addressTelephone: address.telephone, 
                            addressRank: address.rank, 
                            addressAddress: address.province+address.city+address.region, 
                            addressDetail: address.address})
                        )
                    )
                }.bind(this))
            )
        );
    }
});

/**
 * 地址总容器
 */
var Address = React.createClass({displayName: "Address",
    getInitialState: function () {
        return {
            isProgress: -1,
            receiveAddress: [],
            sendAddress: [],
            sendOK: false,
            receiveOk: false,
            child: [
                React.createElement(AddressContainer, {addressList: [], onEditClick: this.onEditClick, headText: "收件地址", isSend: false, 
                                  key: "receiveaddress"}),
                React.createElement(AddressContainer, {addressList: [], onEditClick: this.onEditClick, headText: "发件地址", isSend: true, 
                                  key: "sendaddress"})
            ]
        }
    },
    onEditClick: function (pro) {
        this.setState({
            child: [
                React.createElement(EditAddressComponent, React.__spread({onAddressSubmitSuccess: this.onAddressSubmitSuccess, key: "editaddresscomponent"},  pro))
            ]
        });
    },
    onAddressSubmitSuccess: function () {
        this.componentDidMount();
    },
    componentDidMount: function () {
        setTimeout(function () {
            if (this.state.isProgress == -1 && this.isMounted()) {
                this.setState({isProgress: true});
            }
        }.bind(this), 800);
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getSendAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({sendAddress: data});
                this.setState({sendOK: true});

                if (this.state.receiveOK) {
                    this.setState({isProgress: false});

                    this.setState({
                        child: [
                            React.createElement(AddressContainer, {addressList: this.state.receiveAddress, onEditClick: this.onEditClick, 
                                              headText: "收件地址", isSend: false, key: "receiveaddress"}),
                            React.createElement(AddressContainer, {addressList: data, onEditClick: this.onEditClick, headText: "发件地址", 
                                              isSend: true, key: "sendaddress"})
                        ]
                    });
                }
            }.bind(this),
            error: function (data) {
                this.setState({isProgress: false});
            }.bind(this)
        });
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getAccAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({receiveAddress: data});
                this.setState({receiveOK: true});

                if (this.state.sendOK) {
                    this.setState({isProgress: false});

                    this.setState({
                        child: [
                            React.createElement(AddressContainer, {addressList: data, onEditClick: this.onEditClick, headText: "收件地址", 
                                              isSend: false, key: "receiveaddress"}),
                            React.createElement(AddressContainer, {addressList: this.state.sendAddress, onEditClick: this.onEditClick, 
                                              headText: "发件地址", isSend: true, key: "sendaddress"})
                        ]
                    });
                }
            }.bind(this),
            error: function (data) {
                this.setState({isProgress: false});
            }.bind(this)
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                this.state.child, 
                this.state.isProgress == true ? React.createElement(Progress, null) : ""
            )
        );
    }
});
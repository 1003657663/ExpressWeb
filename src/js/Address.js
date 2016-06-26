/**
 * Created by songchao on 16/6/15.
 */
var AddressItem = React.createClass({displayName: "AddressItem",
    getDefaultProps: function () {
        return {hasEditButton: true, isSendExpress: true};
    },
    propTypes: {
        onEditClick: React.PropTypes.func,
        hasEditButton: React.PropTypes.bool,
        isSend: React.PropTypes.bool,
        isSendExpress: React.PropTypes.bool,
    },
    getInitialState: function () {
        var config = {};
        config.topClass = this.props.isSendExpress == true ? "address_item_on address_item" : "address_item";
        config.itemStyle = {outline: "none"};
        return config;
    },
    handleEditClick: function () {
        //点击之后,把地址信息回传到main中,然后控制main进入地址编辑模块
        this.props.onEditClick(this.props);
    },
    handleItemClick: function (e) {
        if (this.props.isSendExpress) {
            this.props.onItemClick(this.props.isSend, this.props.address);
            this.props.doItemClick(this);
        }
    },
    handleItemOn: function () {

    },
    handleItemOut: function () {

    },
    render: function () {
        return (
            React.createElement("div", {className: this.state.topClass, 
                 onMouseOver: this.props.isSendExpress?this.handleItemOn:"", 
                 onMouseOut: this.props.isSendExpress?this.handleItemOut:"", 
                 style: this.state.itemStyle, onClick: this.handleItemClick}, 
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
        return {isNew: false};
    },
    propTypes: {
        headText: React.PropTypes.string,
        addressList: React.PropTypes.array,
    },
    getInitialState: function () {
        if (this.props.addressList == undefined) {
            console.error("地址参数有误,list为undefined");
            return;
        }
        return {addImg: "../images/address/add.png", beforeSend: "", beforeReceive: ""};
    },
    handleAddImgOn: function () {
        this.setState({addImg: "../images/address/add_on.png"});
    },
    handleAddImgOut: function () {
        this.setState({addImg: "../images/address/add.png"});
    },
    handleAddImgClick: function () {
        this.props.onEditClick({isNew: true, isSend: this.props.isSend});
    },
    doItemClick: function (e) {
        if (this.props.isSend) {
            if (this.state.beforeSend != "") {
                this.state.beforeSend.setState({itemStyle: {}});
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            } else {
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            }
            this.state.beforeSend = e;
        } else {
            if (this.state.beforeReceive != "") {
                this.state.beforeReceive.setState({itemStyle: {}});
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            } else {
                e.setState({itemStyle: {background: "#bfbfbf", color: "#ffffff"}})
            }
            this.state.beforeReceive = e;
        }
    },
    render: function () {
        var pStyle = {marginLeft: "10px", marginRight: "10px"};
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "address_head"}, 
                    React.createElement("span", null, this.props.headText), 
                    React.createElement("img", {title: "新增", onClick: this.handleAddImgClick, onMouseOver: this.handleAddImgOn, 
                         onMouseOut: this.handleAddImgOut, className: "address_add_img", src: this.state.addImg})
                ), 
                
                    this.props.addressList.length == 0 ?
                        (React.createElement(FillWidthP, {style: pStyle}, 
                            this.props.isSend == true ? "没有发件地址,请添加" : "", 
                            this.props.isSend == false ? "没有收件地址,请添加" : ""
                        )) : "", 
                
                this.props.addressList.map(function (address, index) {
                    return (
                        React.createElement(AddressItem, React.__spread({
                            key: "addressitem"+index}, 
                            address, 
                            this.props, 
                            {address: address, 
                            doItemClick: this.doItemClick, 
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
    propTypes: {
        isSendExpress: React.PropTypes.bool,
    },
    getDefaultProps: function () {
        return {isSendExpress: false};
    },
    onItemClick: function (isSend, address) {
        if (isSend) {
            this.state.chooseSendAddress = address;
        } else {
            this.state.chooseReceiveAddress = address;
        }
    },
    getInitialState: function () {
        return {
            isProgress: -1,
            receiveAddress: [],
            sendAddress: [],
            sendOK: false,
            receiveOk: false,
            child: getChild(this, [], []),
            chooseSendAddress: "",
            chooseReceiveAddress: ""
        }
    },
    onEditClick: function (pro) {
        this.setState({
            child: [
                React.createElement(EditAddressComponent, React.__spread({
                    onEditClose: this.onEditClose, 
                    onAddressSubmitSuccess: this.onAddressSubmitSuccess, 
                    key: "editaddresscomponent"},  pro))
            ]
        });
    },
    onAddressSubmitSuccess: function () {
        this.componentDidMount();
    },
    onAddressChoice: function () {
        if (this.state.chooseSendAddress == "" || this.state.chooseReceiveAddress == "") {
            showDialog("dialog", "警告", "请选择发件地址和收件地址", true);
            return;
        }
        this.setState({
            child: [
                React.createElement(SendExpressComponent, {key: "sendexpresscom", sendAddress: this.state.chooseSendAddress, 
                                      receiveAddress: this.state.chooseReceiveAddress, 
                                      onClose: this.handleCloseClick}),//关闭方法传入
                React.createElement(BeforeButton, {key: "beforebutton", onCloseClick: this.handleCloseClick})
            ]
        });
    },
    componentDidMount: function () {
        setTimeout(function () {
            if (this.state.isProgress == -1 && this.isMounted()) {
                this.setState({isProgress: true});
            }
        }.bind(this), 800);
        Tools.myAjax({//send
            type: "get",
            url: "/REST/Misc/getSendAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({sendAddress: data});
                this.setState({sendOK: true});

                if (this.state.receiveOK) {
                    this.setState({isProgress: false});
                    var child = getChild(this, this.state.receiveAddress, data);
                    this.setState({child: child});
                }
            }.bind(this),
            error: function (data) {
                this.setState({isProgress: false});
            }.bind(this)
        });
        //收货
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getAccAddress/customertel/" + User.telephone,
            success: function (data) {
                this.setState({receiveAddress: data});
                this.setState({receiveOK: true});

                if (this.state.sendOK) {
                    this.setState({isProgress: false});
                    var child = getChild(this, data, this.state.sendAddress);
                    this.setState({child: child});
                }
            }.bind(this),
            error: function (data) {
                this.setState({isProgress: false});
            }.bind(this)
        });
    },
    onEditClose: function () {//编辑界面的关闭按钮点击
        this.componentDidMount();
    },
    handleCloseClick: function () {
        this.props.onCloseClick([true]);
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

function getChild(the, receiveAddressList, sendAddressList) {
    var expressAdButton = "";
    if (the.props.isSendExpress) {
        expressAdButton = (
            React.createElement("input", {key: "input4", type: "button", onClick: the.onAddressChoice, className: "login_submit", value: "地址选择完成"}));
    }
    return [
        React.createElement(AddressContainer, {addressList: receiveAddressList, onEditClick: the.onEditClick, headText: "收件地址", 
                          isSend: false, key: "receiveaddress", 
                          isSendExpress: the.props.isSendExpress, onItemClick: the.onItemClick}),
        React.createElement(AddressContainer, {addressList: sendAddressList, onEditClick: the.onEditClick, 
                          headText: "发件地址", isSend: true, key: "sendaddress", 
                          isSendExpress: the.props.isSendExpress, onItemClick: the.onItemClick}),
        expressAdButton,
        React.createElement(BeforeButton, {key: "beforebutton", onCloseClick: the.handleCloseClick})
    ]
}
/**
 * Created by songchao on 16/6/15.
 */
var AddressItem = React.createClass({
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
            <div className="address_item">
                <div className="address_info">
                    <div className="fill_width_margin_8">
                        {this.props.addressRank != 0 ? "" :
                            <span className="address_default_sign">默认</span>
                        }
                        <span className="address_user_name">{this.props.addressUserName}</span>
                        <span className="address_telephone">{this.props.addressTelephone}</span>
                    </div>
                    <p className="fill_width_margin_8 address_city_all">{this.props.addressAddress}</p>
                    <p className="fill_width_margin_8 address_detail">{this.props.addressDetail}</p>
                </div>
                <div className="address_edit_button">
                    <img src="../images/address/edit.png" onClick={this.handleEditClick}/>
                </div>
            </div>
        );
    }
});

var AddressContainer = React.createClass({
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
            <div className="row">
                <div className="address_head">
                    <span>{this.props.headText}</span>
                    <img title="新增" onClick={this.handleAddImgClick} onMouseOver={this.handleAddImgOn} onMouseOut={this.handleAddImgOut} className="address_add_img" src={this.state.addImg} />
                </div>
                {this.props.addressList.map(function (address, index) {
                    return (
                        <AddressItem
                            key={"addressitem"+index}
                            {...address}
                            isSend={this.props.isSend}
                            onEditClick={this.props.onEditClick}
                            addressUserName={address.name}
                            addressTelephone={address.telephone}
                            addressRank={address.rank}
                            addressAddress={address.province+address.city+address.region}
                            addressDetail={address.address}>
                        </AddressItem>
                    )
                }.bind(this))}
            </div>
        );
    }
});

/**
 * 地址总容器
 */
var Address = React.createClass({
    getInitialState: function () {
        return {
            isProgress: -1,
            receiveAddress: [],
            sendAddress: [],
            sendOK: false,
            receiveOk: false,
            child: [
                <AddressContainer addressList={[]} onEditClick={this.onEditClick} headText="收件地址" isSend={false}
                                  key="receiveaddress"/>,
                <AddressContainer addressList={[]} onEditClick={this.onEditClick} headText="发件地址" isSend={true}
                                  key="sendaddress"/>
            ]
        }
    },
    onEditClick: function (pro) {
        this.setState({
            child: [
                <EditAddressComponent onAddressSubmitSuccess={this.onAddressSubmitSuccess} key="editaddresscomponent" {...pro} />
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
                            <AddressContainer addressList={this.state.receiveAddress} onEditClick={this.onEditClick}
                                              headText="收件地址" isSend={false} key="receiveaddress"/>,
                            <AddressContainer addressList={data} onEditClick={this.onEditClick} headText="发件地址"
                                              isSend={true} key="sendaddress"/>
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
                            <AddressContainer addressList={data} onEditClick={this.onEditClick} headText="收件地址"
                                              isSend={false} key="receiveaddress"/>,
                            <AddressContainer addressList={this.state.sendAddress} onEditClick={this.onEditClick}
                                              headText="发件地址" isSend={true} key="sendaddress"/>
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
            <div className="address_container">
                {this.state.child}
                {this.state.isProgress == true ? <Progress /> : ""}
            </div>
        );
    }
});
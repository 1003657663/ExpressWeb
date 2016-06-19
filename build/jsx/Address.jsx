/**
 * Created by songchao on 16/6/15.
 */
var AddressItem = React.createClass({
    getDefaultProps: function () {
        return {hasEditButton:true}
    },
    propTypes: {
        addressUserName: React.PropTypes.string,
        addressTelephone: React.PropTypes.string,
        addressAddress: React.PropTypes.string,
        addressDetail: React.PropTypes.string,
        onEditClick: React.PropTypes.func,
        hasEditButton:React.PropTypes.bool,
        isSend: React.PropTypes.bool,
    },
    handleEditClick: function () {
        //点击之后,把地址信息回传到main中,然后控制main进入地址编辑模块
        this.props.onEditClick(
            this.props
        );
    },
    render: function () {
        return (
            <div className="row address_item">
                <div className="address_info">
                    <div>
                        <span className="address_user_name">{this.props.addressUserName}</span>
                        <span className="address_telephone">{this.props.addressTelephone}</span>
                    </div>
                    <p className="address_city_all">{this.props.addressAddress}</p>
                    <p className="address_detail">{this.props.addressDetail}</p>
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
        return null;
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        headText: React.PropTypes.string,
        addressList: React.PropTypes.array,
    },
    getInitialState: function () {
        var config = {};
        if(this.props.addressList == undefined){
            console.error("地址参数有误,list为undefined");
            return;
        }
        return config;
    },
    render: function () {
        return (
            <div className="row">
                <p className="address_head">{this.props.headText}</p>
                <div className="container">
                    {this.props.addressList.map(function (address,index) {
                        return (
                            <AddressItem
                                key={"addressitem"+index}
                                 {...this.props}
                                   addressUserName={address.userName} addressTelephone={address.telephone}
                                    addressAddress={address.address} addressDetail={address.detail} >
                            </AddressItem>
                        )
                    }.bind(this))}
                </div>
            </div>
        );
    }
});

/**
 * 地址总容器
 */
var Address = React.createClass({
    onEditClick: function (props) {
        console.info([props.addressUserName,
            props.addressTelephone,
            props.addressAddress,
            props.addressDetail].join());
    },
    getInitialState: function () {
        return {
            isProgress:-1,
            receiveAddress:[],
            sendAddress:[],
            child: [
                <AddressContainer addressList={[]} onEditClick={this.onEditClick} headText="收件地址" isSend={false} key="receiveaddress"/>,
                <AddressContainer addressList={[]} onEditClick={this.onEditClick} headText="发件地址" isSend={true} key="sendaddress"/>
            ]
        }
    },
    componentWillMount:function () {
    },
    componentDidMount: function () {
        setTimeout(function () {
            if(this.state.isProgress == -1 && this.isMounted()){
                this.setState({isProgress:true});
            }
        }.bind(this),800);
        Tools.myAjax({
            type:"get",
            url:"http://www.baidu.com",
            success: function (data) {
                this.setState({isProgress:false});

            }.bind(this),
            error: function (data) {
                this.setState({isProgress:false});

                this.setState({
                    child:[
                        <AddressContainer addressList={Test.addressList} onEditClick={this.onEditClick} headText="收件地址" isSend={false} key="receiveaddress"/>,
                        <AddressContainer addressList={Test.addressList} onEditClick={this.onEditClick} headText="发件地址" isSend={true} key="sendaddress"/>
                    ]});
            }.bind(this)
        })
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
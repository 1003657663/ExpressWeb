/**
 * Created by songchao on 16/6/18.
 */


/**
 * 寄快递页面,,,待实现---wait---重新选择地址
 */
var SendExpressComponent = React.createClass({
    propTypes: {
        onClose:React.PropTypes.func,
        sendAddress:React.PropTypes.object,
        receiveAddress:React.PropTypes.object,
    },
    handleSubmitClick: function () {
        Tools.myAjax({
            type:"get",
            url:"/REST/Domain/prepareSendExpress/customerId/"+
                User.id+"/sendAddressId/"+this.props.sendAddress.aid +
                "/recAddressId/"+this.props.receiveAddress.aid,
            success: function (data) {
                if(data.state!=undefined){
                    showDialog("dialog","恭喜","寄快递成功\r\n单号请记好:"+data.state,true,this.props.onClose);
                }else{
                    showDialog("dialog","警告","寄快递失败,请重试",true);
                }
            }.bind(this),
            error: function (data) {
                console.error({"提交快递数据错误":data});
            }.bind(this)
        })
    },
    render: function () {
        var sendAddress = this.props.sendAddress;
        var receiveAddress = this.props.receiveAddress;
        var headStyle = {background:"#cc3c14"};
        return (
            <div>
                <div key="head" className="row address_head" style={headStyle} >
                    <span>寄快递</span>
                </div>
                <div key="smallheadsend" className="small_head_title">发件人信息</div>
                <div>
                    <FillWidthP>姓名:{sendAddress.name}</FillWidthP>
                    <FillWidthP>电话:{sendAddress.telephone}</FillWidthP>
                    <FillWidthP>地址:{sendAddress.province+sendAddress.city+sendAddress.region}</FillWidthP>
                    <FillWidthP>详细地址:{sendAddress.address}</FillWidthP>
                </div>
                <div key="smallheadreceive" className="small_head_title">收件人信息</div>
                <div>
                    <FillWidthP>姓名:{receiveAddress.name}</FillWidthP>
                    <FillWidthP>电话:{receiveAddress.telephone}</FillWidthP>
                    <FillWidthP>地址:{receiveAddress.province+receiveAddress.city+receiveAddress.region}</FillWidthP>
                    <FillWidthP>详细地址:{receiveAddress.address}</FillWidthP>
                </div>
                <input key="sendexpresssubmit" onClick={this.handleSubmitClick} type="button" value="提交快件信息" className="login_submit"/>
            </div>
        );
    }
});
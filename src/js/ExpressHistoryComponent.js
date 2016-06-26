/**
 * Created by songchao on 16/6/18.
 */


/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({displayName: "ExpressHistoryItem",
    propTypes: {
        itemClick: React.PropTypes.func,
    },
    handleItemClick: function () {
        this.props.itemClick(this.props);
    },
    render: function () {
        return (
            React.createElement("div", {className: "history_item", onClick: this.handleItemClick}, 
                React.createElement("p", null, "单号:", this.props.ID), 
                React.createElement(FillWidthDiv, {classNames: ["display-table"]}, 
                    React.createElement("span", {className: "float_left"}, 
                        "发件人:", this.props.sname
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "发件时间:", this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime
                    )
                ), 
                React.createElement("div", {className: "clearfix"}), 
                React.createElement("div", {className: "fill_width_margin_5 display-table width_all"}, 
                    React.createElement("span", {className: "float_left"}, 
                        "收件人:", this.props.rname
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "收件时间:", this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime
                    )
                ), 
                React.createElement("div", {className: "clearfix"})
            )
        );
    }
});


var HistoryContainer = React.createClass({displayName: "HistoryContainer",
    getDefaultProps: function () {
        return null;
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        headText: React.PropTypes.string,
        historyList: React.PropTypes.array,
        itemClick: React.PropTypes.func,
    },
    getInitialState: function () {
        var config = {};
        if (this.props.historyList == undefined) {
            console.error("历史数据有误,list为undefined");
            return;
        }
        return config;
    },
    render: function () {
        var style = {marginLeft: "10px", marginRight: "10px"};
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("p", {className: "address_head"}, this.props.headText), 
                this.props.historyList.length == 0 ?
                    (React.createElement(FillWidthP, {style: style}, "无", this.props.headText)) : "", 
                
                this.props.historyList.map(function (history, index) {
                    return (
                        React.createElement(ExpressHistoryItem, React.__spread({
                            key: "historyitem"+index}, 
                            history, 
                            {itemClick: this.props.itemClick
                        })
                        )
                    )
                }.bind(this))
            )
        );
    }
});

/**
 * 历史详情页面
 */
var HistoryDetail = React.createClass({displayName: "HistoryDetail",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(FillWidthP, null, 
                    "快递单号:", this.props.ID
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人:", this.props.rname
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人电话:", this.props.rtel
                ), 
                React.createElement(FillWidthP, null, 
                    "收件人地址:", this.props.radd
                ), 
                React.createElement(FillWidthP, null, 
                    "签收时间:", this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人姓名:", this.props.sname
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人电话号:", this.props.stel
                ), 
                React.createElement(FillWidthP, null, 
                    "发件人地址:", this.props.sadd
                ), 
                React.createElement(FillWidthP, null, 
                    "发件时间:", this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime
                ), 
                React.createElement(FillWidthP, null, 
                    "快件重量:", this.props.weight + "Kg"
                ), 
                React.createElement(FillWidthP, null, 
                    "费用:", this.props.tranFee + "元"
                )
            )
        )
    }
});


/**
 * 历史记录整体,容器
 */
var ExpressHistotyComponent = React.createClass({displayName: "ExpressHistotyComponent",
    getInitialState: function () {
        return {
            addressList: [],
            isProgress: -1,
            historyReceiveList: [],
            historySendList: [],
            child: gethistoryComponentChild(this, [], []),
        }
    },

    componentDidMount: function () {
        setTimeout(function () {
            if (this.state.isProgress == -1 && this.isMounted()) {
                this.setState({isProgress: true});
            }
        }.bind(this), 800);
        //获取收件记录
        var sendOK = false;
        var receiveOk = false;
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getRercvExpressInfoByCustomerId/" + User.id,
            success: function (data) {
                receiveOk = true;
                this.state.historyReceiveList = data;
                if (sendOK && this.isMounted()) {
                    this.setState({
                        isProgress: false,
                        child: gethistoryComponentChild(this, this.state.historyReceiveList, this.state.historySendList)
                    });
                }
            }.bind(this),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "获取历史收件数据出错", true);
            }.bind(this)
        });
        //获取发件记录
        Tools.myAjax({
            type: "get",
            url: "/REST/Domain/getSendExpressInfoByCustomerId/" + User.id,
            success: function (data) {
                sendOK = true;
                this.state.historySendList = data;
                if (receiveOk && this.isMounted()) {
                    this.setState({
                        isProgress: false,
                        child: gethistoryComponentChild(this, this.state.historyReceiveList, this.state.historySendList)
                    });
                }
            }.bind(this),
            error: function () {
                console.error(data);
                showDialog("dialog", "警告", "获取历史发件数据出错", true);
            }.bind(this)
        });
    },
    handleHistoryItemClick: function (pro) {
        this.setState({
            child: [
                React.createElement(HistoryDetail, React.__spread({key: "historydetail"},  pro))
            ]
        });
    },
    handleCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                this.state.child, 
                this.state.isProgress == true ? React.createElement(Progress, null) : "", 
                React.createElement(BeforeButton, {onCloseClick: this.handleCloseClick, key: "beforebutton"})
            )
        );
    }
});

/**
 * 返回历史记录的容器元素,通过给定参数,传入list
 * @param the
 * @param historyReceiveList
 * @param historySendList
 * @returns {XML[]}
 */
function gethistoryComponentChild(the, historyReceiveList, historySendList) {
    return [
        React.createElement(HistoryContainer, {
            itemClick: the.handleHistoryItemClick, 
            historyList: historyReceiveList, 
            headText: "收件历史", 
            isSend: false, 
            key: "receivehistory"}
        ),

        React.createElement(HistoryContainer, {
            itemClick: the.handleHistoryItemClick, 
            historyList: historySendList, 
            headText: "发件历史", 
            isSend: true, 
            key: "sendhistory"}
        )
    ]
}
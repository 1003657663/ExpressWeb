/**
 * Created by songchao on 16/6/18.
 */


/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({displayName: "ExpressHistoryItem",
    propTypes: {
        historyID: React.PropTypes.number,
        historySendName: React.PropTypes.string,
        historySendTime: React.PropTypes.string,
        historyReceiveName: React.PropTypes.string,
        historyReceiveTime: React.PropTypes.string,
        itemClick: React.PropTypes.func,
    },
    handleItemClick: function () {
        this.props.itemClick(this.props);
    },
    render: function () {
        return (
            React.createElement("div", {className: "history_item", onClick: this.handleItemClick}, 
                React.createElement("p", null, "单号:", this.props.historyID), 
                React.createElement(FillWidthDiv, {classNames: ["display-table"]}, 
                    React.createElement("span", {className: "float_left"}, 
                        "发件人:", this.props.historySendName
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "发件时间:", this.props.historySendTime
                    )
                ), 
                React.createElement("div", {className: "clearfix"}), 
                React.createElement("div", {className: "fill_width_margin_5 display-table width_all"}, 
                    React.createElement("span", {className: "float_left"}, 
                        "收件人:", this.props.historyReceiveName
                    ), 
                    React.createElement("span", {className: "float_right"}, 
                        "收件时间:", this.props.historyReceiveTime
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
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("p", {className: "address_head"}, this.props.headText), 
                this.props.historyList.map(function (history, index) {
                    return (
                        React.createElement(ExpressHistoryItem, React.__spread({
                            key: "historyitem"+index}, 
                            this.props, 
                            {historyID: history.historyID, 
                            historySendName: history.historySendName, 
                            historySendTime: history.historySendTime, 
                            historyReceiveName: history.historyReceiveName, 
                            historyReceiveTime: history.historyReceiveTime
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
    propTypes: {
        historyID: React.PropTypes.number,
        historySendName: React.PropTypes.string,
        historySendTime: React.PropTypes.string,
        historyReceiveName: React.PropTypes.string,
        historyReceiveTime: React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement(FillWidthP, null, 
                    "姓名:宋超"
                ), 
                React.createElement(FillWidthP, null, 
                    "电话:15038290935"
                ), 
                React.createElement(FillWidthP, null, 
                    "地址:是考虑到机房里肯定是敬爱放"
                ), 
                React.createElement(FillWidthP, null, 
                    "时间:2019-05-02"
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
            child: getHistoryComponentChild(this,[],[]),
        }
    },
    componentDidMount: function () {
        setTimeout(function () {
            if (this.state.isProgress == -1 && this.isMounted()) {
                this.setState({isProgress: true});
            }
        }.bind(this), 800);
        //-------test---
        var list = Test.historyList;
        Tools.myAjax({
            type: "get",
            url: "http://www.baidu.com",
            success: function () {
                if (this.isMounted()) {
                    this.setState({isProgress: false});
                    this.setState({
                        child: getHistoryComponentChild(this,list,list)
                    });
                }
            }.bind(this),
            error: function () {
                if (this.isMounted()) {
                    this.setState({
                        isProgress: false,
                        child:getHistoryComponentChild(this,list,list),
                    });
                }
            }.bind(this)
        });
    },
    handleHistoryItemClick: function (props) {
        this.setState({
            child:[
                React.createElement(HistoryDetail, React.__spread({key: "historydetail"},  props))
            ]
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

/**
 * 返回历史记录的容器元素,通过给定参数,传入list
 * @param thi
 * @param historyReceiveList
 * @param historySendList
 * @returns {XML[]}
 */
function getHistoryComponentChild(thi, historyReceiveList, historySendList) {
    return [
        React.createElement(HistoryContainer, {
            itemClick: thi.handleHistoryItemClick, 
            historyList: historyReceiveList, 
            headText: "收件历史", 
            isSend: false, 
            key: "receivehistory"}
        ),

        React.createElement(HistoryContainer, {
            itemClick: thi.handleHistoryItemClick, 
            historyList: historySendList, 
            headText: "发件历史", 
            isSend: true, 
            key: "sendhistory"}
        )
    ]
}
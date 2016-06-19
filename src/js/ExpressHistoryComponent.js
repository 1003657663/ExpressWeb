/**
 * Created by songchao on 16/6/18.
 */

/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({displayName: "ExpressHistoryItem",
    propTypes:{
        historyID:React.PropTypes.number,
        historySendName:React.PropTypes.string,
        historySendTime:React.PropTypes.string,
        historyReceiveName:React.PropTypes.string,
        historyReceiveTime:React.PropTypes.string,
    },
    render: function () {
        return (
            React.createElement("div", {className: "row address_item"}, 
                React.createElement("p", null, "单号:", this.props.historyID), 
                React.createElement("div", null, 
                    React.createElement("span", {className: "float_left"}, "发件人:", this.props.historySendName), 
                    React.createElement("span", {className: "float_right"}, "发件时间:", this.props.historySendTime)
                ), 
                React.createElement("div", {className: "clearfix"}), 
                React.createElement("div", null, 
                    React.createElement("span", {className: "float_left"}, "收件人:", this.props.historyReceiveName), 
                    React.createElement("span", {className: "float_right"}, "收件时间:", this.props.historyReceiveTime)
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
        if(this.props.historyList == undefined){
            console.error("历史数据有误,list为undefined");
            return;
        }
        return config;
    },
    render: function () {
        return (
            React.createElement("div", {className: "row"}, 
                React.createElement("p", {className: "address_head"}, this.props.headText), 
                React.createElement("div", {className: "container"}, 
                    this.props.historyList.map(function (history,index) {
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
            )
        );
    }
});
/**
 * 历史记录整体,容器
 */
var ExpressHistotyComponent = React.createClass({displayName: "ExpressHistotyComponent",
    getInitialState: function () {
        return {
            addressList: [],
            isProgress:-1,
            historyReceiveList:[],
            historySendList:[]
        }
    },
    componentDidMount: function () {
        setTimeout(function() {
            if(this.state.isProgress == -1 && this.isMounted()) {
                console.info("state "+this.state.isProgress);
                this.setState({isProgress: true});
            }
        }.bind(this),800);
        //-------test---
        var list = Test.historyList;
        Tools.myAjax({
            type: "get",
            url: "http://www.baidu.com",
            success:function () {
                if(this.isMounted()) {
                    this.setState({isProgress: false});
                }
            }.bind(this),
            error: function () {
                if(this.isMounted()) {
                    this.setState({
                        isProgress: false,
                        historyReceiveList: list,
                        historySendList:list
                    });
                }
            }.bind(this)
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "address_container"}, 
                React.createElement(HistoryContainer, {
                     historyList: this.state.historyReceiveList, 
                      headText: "收件历史", 
                       isSend: false, 
                         key: "receivehistory"}
                ), 
                React.createElement(HistoryContainer, {
                     historyList: this.state.historySendList, 
                      headText: "发件历史", 
                       isSend: true, 
                        key: "sendhistory"}
                ), 
                this.state.isProgress == true ?React.createElement(Progress, null):""
            )
        );
    }
});
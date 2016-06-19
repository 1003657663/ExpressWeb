/**
 * Created by songchao on 16/6/18.
 */

/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({
    propTypes:{
        historyID:React.PropTypes.number,
        historySendName:React.PropTypes.string,
        historySendTime:React.PropTypes.string,
        historyReceiveName:React.PropTypes.string,
        historyReceiveTime:React.PropTypes.string,
    },
    render: function () {
        return (
            <div className="row address_item">
                <p>单号:{this.props.historyID}</p>
                <div>
                    <span className="float_left">发件人:{this.props.historySendName}</span>
                    <span className="float_right">发件时间:{this.props.historySendTime}</span>
                </div>
                <div className="clearfix"></div>
                <div>
                    <span className="float_left">收件人:{this.props.historyReceiveName}</span>
                    <span className="float_right">收件时间:{this.props.historyReceiveTime}</span>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
});


var HistoryContainer = React.createClass({
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
            <div className="row">
                <p className="address_head">{this.props.headText}</p>
                <div className="container">
                    {this.props.historyList.map(function (history,index) {
                        return (
                            <ExpressHistoryItem
                                key={"historyitem"+index}
                                {...this.props}
                                historyID = {history.historyID}
                                 historySendName={history.historySendName}
                                  historySendTime={history.historySendTime}
                                   historyReceiveName={history.historyReceiveName}
                                    historyReceiveTime={history.historyReceiveTime}
                            >
                            </ExpressHistoryItem>
                        )
                    }.bind(this))}
                </div>
            </div>
        );
    }
});
/**
 * 历史记录整体,容器
 */
var ExpressHistotyComponent = React.createClass({
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
            <div className="address_container">
                <HistoryContainer
                     historyList={this.state.historyReceiveList}
                      headText="收件历史"
                       isSend={false}
                         key="receivehistory"
                />
                <HistoryContainer
                     historyList={this.state.historySendList}
                      headText="发件历史"
                       isSend={true} 
                        key="sendhistory"
                />
                {this.state.isProgress == true ?<Progress/>:""}
            </div>
        );
    }
});
/**
 * Created by songchao on 16/6/18.
 */


/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({
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
            <div className="history_item" onClick={this.handleItemClick}>
                <p>单号:{this.props.historyID}</p>
                <FillWidthDiv classNames={["display-table"]}>
                    <span className="float_left">
                        发件人:{this.props.historySendName}
                    </span>
                    <span className="float_right">
                        发件时间:{this.props.historySendTime}
                    </span>
                </FillWidthDiv>
                <div className="clearfix"></div>
                <div className="fill_width_margin_5 display-table width_all">
                    <span className="float_left">
                        收件人:{this.props.historyReceiveName}
                    </span>
                    <span className="float_right">
                        收件时间:{this.props.historyReceiveTime}
                    </span>
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
        if (this.props.historyList == undefined) {
            console.error("历史数据有误,list为undefined");
            return;
        }
        return config;
    },
    render: function () {
        return (
            <div className="row">
                <p className="address_head">{this.props.headText}</p>
                {this.props.historyList.map(function (history, index) {
                    return (
                        <ExpressHistoryItem
                            key={"historyitem"+index}
                            {...this.props}
                            historyID={history.historyID}
                            historySendName={history.historySendName}
                            historySendTime={history.historySendTime}
                            historyReceiveName={history.historyReceiveName}
                            historyReceiveTime={history.historyReceiveTime}
                        >
                        </ExpressHistoryItem>
                    )
                }.bind(this))}
            </div>
        );
    }
});

/**
 * 历史详情页面
 */
var HistoryDetail = React.createClass({
    propTypes: {
        historyID: React.PropTypes.number,
        historySendName: React.PropTypes.string,
        historySendTime: React.PropTypes.string,
        historyReceiveName: React.PropTypes.string,
        historyReceiveTime: React.PropTypes.string,
    },
    render: function () {
        return (
            <div>
                <FillWidthP>
                    姓名:宋超
                </FillWidthP>
                <FillWidthP>
                    电话:15038290935
                </FillWidthP>
                <FillWidthP>
                    地址:是考虑到机房里肯定是敬爱放
                </FillWidthP>
                <FillWidthP>
                    时间:2019-05-02
                </FillWidthP>
            </div>
        )
    }
});


/**
 * 历史记录整体,容器
 */
var ExpressHistotyComponent = React.createClass({
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
                <HistoryDetail key="historydetail" {...props} />
            ]
        });
    },
    render: function () {
        return (
            <div className="address_container">
                {this.state.child}
                {this.state.isProgress == true ? <Progress/> : ""}
            </div>
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
        <HistoryContainer
            itemClick={thi.handleHistoryItemClick}
            historyList={historyReceiveList}
            headText="收件历史"
            isSend={false}
            key="receivehistory"
        />,

        <HistoryContainer
            itemClick={thi.handleHistoryItemClick}
            historyList={historySendList}
            headText="发件历史"
            isSend={true}
            key="sendhistory"
        />
    ]
}
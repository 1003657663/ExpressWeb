/**
 * Created by songchao on 16/6/18.
 */


/**
 * 单个历史记录item
 */
var ExpressHistoryItem = React.createClass({
    propTypes: {
        /*getTime:React.PropTypes.string,
         historyID: React.PropTypes.number,
         historySendName: React.PropTypes.string,
         historySendTime: React.PropTypes.string,
         historyReceiveName: React.PropTypes.string,
         historyReceiveTime: React.PropTypes.string,*/
        itemClick: React.PropTypes.func,
    },
    handleItemClick: function () {
        this.props.itemClick(this.props);
    },
    render: function () {
        return (
            <div className="history_item" onClick={this.handleItemClick}>
                <p>单号:{this.props.ID}</p>
                <FillWidthDiv classNames={["display-table"]}>
                    <span className="float_left">
                        发件人:{this.props.sname}
                    </span>
                    <span className="float_right">
                        发件时间:{this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime}
                    </span>
                </FillWidthDiv>
                <div className="clearfix"></div>
                <div className="fill_width_margin_5 display-table width_all">
                    <span className="float_left">
                        收件人:{this.props.rname}
                    </span>
                    <span className="float_right">
                        收件时间:{this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime}
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
            <div className="row">
                <p className="address_head">{this.props.headText}</p>
                {this.props.historyList.length == 0 ?
                    (<FillWidthP style={style}>无{this.props.headText}</FillWidthP>) : ""
                }
                {this.props.historyList.map(function (history, index) {
                    return (
                        <ExpressHistoryItem
                            key={"historyitem"+index}
                            {...history}
                            itemClick={this.props.itemClick}
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
    render: function () {
        return (
            <div>
                <FillWidthP>
                    快递单号:{this.props.ID}
                </FillWidthP>
                <FillWidthP>
                    收件人:{this.props.rname}
                </FillWidthP>
                <FillWidthP>
                    收件人电话:{this.props.rtel}
                </FillWidthP>
                <FillWidthP>
                    收件人地址:{this.props.radd}
                </FillWidthP>
                <FillWidthP>
                    签收时间:{this.props.getTime == "null" || this.props.getTime == undefined ? "未签收" : this.props.getTime}
                </FillWidthP>
                <FillWidthP>
                    发件人姓名:{this.props.sname}
                </FillWidthP>
                <FillWidthP>
                    发件人电话号:{this.props.stel}
                </FillWidthP>
                <FillWidthP>
                    发件人地址:{this.props.sadd}
                </FillWidthP>
                <FillWidthP>
                    发件时间:{this.props.outTime == "null" || this.props.outTime == undefined ? "未揽收" : this.props.outTime}
                </FillWidthP>
                <FillWidthP>
                    快件重量:{this.props.weight + "Kg"}
                </FillWidthP>
                <FillWidthP>
                    费用:{this.props.tranFee + "元"}
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
                <HistoryDetail key="historydetail" {...pro} />
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
 * @param the
 * @param historyReceiveList
 * @param historySendList
 * @returns {XML[]}
 */
function gethistoryComponentChild(the, historyReceiveList, historySendList) {
    return [
        <HistoryContainer
            itemClick={the.handleHistoryItemClick}
            historyList={historyReceiveList}
            headText="收件历史"
            isSend={false}
            key="receivehistory"
        />,

        <HistoryContainer
            itemClick={the.handleHistoryItemClick}
            historyList={historySendList}
            headText="发件历史"
            isSend={true}
            key="sendhistory"
        />
    ]
}
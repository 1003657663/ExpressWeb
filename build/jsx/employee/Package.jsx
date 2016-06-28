/**
 * Created by songchao on 16/6/26.
 */

/**
 * 打包和拆包的容器
 */
var Package = React.createClass({
    propTypes: {
        isPackageIn: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            expresses: [],
            addExpress: this.addExpress,
            width: "",
            packageID: "",
        }
    },
    addExpress: function (expressId) {//向界面和state中增加expressID
        if (this.state.expresses.contains(expressId)) {
            showDialog("dialog", "警告", "这个快递已经在列表中", true);
            return;
        }
        if (User.job == 1) {//如果是快递员,那么包裹id是快递员自己的
            if (User.recvPackageId != null) {
                addExpressToPackage(this, User.recvPackageId, expressId);
            } else {
                showDialog("dialog", "警告", "快递员收件包裹id是空,请重试", true);
            }
        } else {
            if (this.state.packageID == "") {
                showDialog("dialog", "警告", "包裹id是空,请重新填写包裹id", true);
            } else {
                addExpressToPackage(this, this.state.packageID, expressId);
            }
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    componentDidUpdate: function () {
        var li = this.refs["li" + (this.state.expresses.length - 1)];
        setTimeout(function () {//----产生动画
            $(li).attr("class", "package_list_li package_list_li_on");
        }, 10);
    },
    sureButtonGetPackageID: function () {
        if (this.state.packageID != "") {//dialog点击确定后,获取包裹中的快递信息
            getExpressFromPackage(this.state.packageID, this.getExpressListSuccess);
        } else {
            showDialog("dialog", "警告", "包裹id是空,请重新填写包裹id", true);
            this.onCloseClick();//包裹好是空的,那么返回重新填写包裹号
        }
    },
    getExpressListSuccess: function (data) {
        var expresses = this.state.expresses;
        for (var i = 0; i < data.length; i++) {
            expresses.push(data[i].ID);
        }
        this.setState({expresses: expresses});
    },
    getPackageIDChange: function (e) {
        if (e.target.value != "" && !isNaN(e.target.value)) {//如果格式正确获取dialog中的输入
            this.setState({packageID: e.target.value});
        }
    },
    componentDidMount: function () {
        if (this.props.isPackageIn) {
            if (this.state.expresses.length == 0) {
                showDialog("dialog", "提醒", "请在顶部搜索框输入快递号,点击旁边的加号添加", true);
            }
        }
        if (!this.props.isPackageIn) {//---如果是拆包,那么弹出输入包裹id的dialog
            placeInputPackageID(this.sureButtonGetPackageID, this.getPackageIDChange);
        }
        User.Package = this;//进入时把这个部分的引用暴露出去

        initPackage(this.props.isPackageIn);//初始化包裹
    }
    ,
    componentWillUnmount: function () {
        User.Package = null;//退出的时候引用消除
    }
    ,
    smallCloseButtonOn: function (e) {
        e.target.src = "../images/index/close_on.png";
    }
    ,
    smallCloseButtonOut: function (e) {
        e.target.src = "../images/index/close.png";
    }
    ,
    smallRemoveClick: function (e) {
        var index = parseInt(e.target.dataset.index);
        var expresses = this.state.expresses;
        var willDelExpressID = expresses.splice(index, 1);
        if (this.props.isPackageIn) {//如果是打包,删除的时候必须进行网络请求
            if (User.job == 1) {
                delExpressFromPackage(this, User.recvPackageId, willDelExpressID, expresses);//打包,删除需要网络请求
            } else {
                delExpressFromPackage(this, this.state.packageID, willDelExpressID, expresses);//打包,删除需要网络请求
            }
        } else {
            this.setState({expresses: expresses});//拆包,直接去掉就可以
            if (expresses.length == 0) {
                showDialog("dialog", "提示", "快递列表为空请点击拆包按钮完成提交", true);
            }
        }
    }
    ,
    handleSubmit: function () {
        if (this.props.isPackageIn) {
            this.onCloseClick();
        } else {
            //拆包网络请求,要拆的包裹id参数
            packageOut(this.state.packageID, this.onCloseClick);
        }
    },
    render: function () {
        return (
            <div className="row">
                <div key="headtext" ref="addressHead" className="address_head">
                    <span>{this.props.isPackageIn ? "快件打包" : "快件拆包"}</span>
                </div>
                <ul key="packagelist" className="package_list">
                    {this.state.expresses.map(function (data, index) {
                        return (
                            <li ref={"li"+index} className="package_list_li" key={index}>
                                {data}
                                <img data-index={index} src="../images/index/close.png"
                                     className="package_one_remove" onMouseOver={this.smallCloseButtonOn}
                                     onMouseOut={this.smallCloseButtonOut} onClick={this.smallRemoveClick}/>
                            </li>
                        )
                    }.bind(this))}
                </ul>
                <button onClick={this.handleSubmit}
                        className="login_submit package_submit">{this.props.isPackageIn ? "打包完成" : "拆包完成"}</button>
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            </div>
        );
    }
});


/**
 * 49560510764476
 * 拆包
 * @param packageId
 * @param packageSuccess
 */
function packageOut(packageId, packageSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/openPackageByPackageId/" + packageId,
        success: function (data) {
            //拆包成功
            if (data.state == "1") {
                showDialog("dialog", "恭喜", "拆包成功", true, packageSuccess);
            } else {
                showDialog("dialog", "警告", "拆包出错,请重新点击拆包按钮尝试", true);
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "拆包出错,请重新点击拆包按钮尝试", true);
        }
    })
}

/**
 * 从包裹中删除快递
 * @param the
 * @param packageID
 * @param expressID
 * @param expresses
 */
function delExpressFromPackage(the, packageID, expressID, expresses) {
    ///deleteFromPackage/packageId/{packageId}/expressId/{expressId}/{token}
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/deleteFromPackage/packageId/" + packageID + "/expressId/" + expressID,
        success: function (data) {
            if (data.state == "1") {
                the.setState({expresses: expresses});
            } else {
                showDialog("dialog", "警告", "删除包裹失败,请重试", true);
            }
        },
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "删除包裹失败,请重试", true);
        }
    })
}

/**
 * 添加快递到包裹中
 * @param the
 * @param packageID
 * @param expressID
 */
function addExpressToPackage(the, packageID, expressID) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/loadIntoPackage/packageId/" + packageID + "/id/" + expressID + "/isPackage/0",
        success: function (data) {
            if (data.state == "1") {
                var expresses = the.state.expresses;
                expresses.push(expressID);
                the.setState({expresses: expresses});
            } else {
                showDialog("dialog", "警告", "加入包裹失败,请重试", true);
            }
        }.bind(this),
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "添加包裹错误,请重试", true);
        }
    })
}

/**
 * 初始化包裹信息,如果是快递员,那么创建收发包裹,如果是分拣员和司机那么,输入包裹号
 */
function initPackage(isPackageIn) {
    if (User.job == 1) {//----如果是快递员,如果包裹为空,那么创建派送包和揽收包
        if (User.sendPackageId == null) {
            createPackage(true);//创建快递员发件包裹
        }
        if (User.recvPackageId == null) {
            createPackage(false)//创建快递员收件包裹
        }
    } else if (User.job == 2) {//---如果是分拣员,首先选择快递起点和终点站点id
        if (isPackageIn) {
            placeChoiceSite();//--选择后创建包裹
        }
    }
}

/**
 * react组件,dialog中的选择站点部分的容器
 */
var SelectSiteDialog = React.createClass({
    getInitialState: function () {
        return {
            sendSiteID: "",
            receiveSiteID: "",
            isPackage: this.props.isPackage == false? false : true,
        }
    },
    sendSiteChange: function (e) {
        this.props.getResult(e.target.value, null);
    },
    receiveSiteChange: function (e) {
        this.props.getResult(null, e.target.value);
    },
    render: function () {
        var selectStyle = this.state.isPackage?{width: "50%", float: "left"}:{width:"100%"};
        return (
            <div>
                <select key="selectsend" style={selectStyle} className="form-control" onChange={this.sendSiteChange}>
                    <option value="-1">{this.state.isPackage ? "请选择起始站点" : "请选择一个站点"}</option>
                    {this.props.data.map(function (d, index) {
                        return <option key={"option"+index} value={d.id}>{d.name}</option>
                    })}
                </select>
                {this.state.isPackage ? (
                    <select key="selectreceive" style={selectStyle} className="form-control"
                            onChange={this.receiveSiteChange}>
                        <option value="-1">请选择终点站点</option>
                        {this.props.data.map(function (d, index) {
                            return <option key={"option"+index} value={d.id}>{d.name}</option>
                        })}
                    </select>
                ) : ""}
                <div className="clearfix"></div>
            </div>
        );
    }
});

/**
 * 弹出请选择站点的窗口
 */
function placeChoiceSite() {
    ///Misc/getAllBranch/{token}
    //返回：List<OutletsEntity>
    var sendSiteID = undefined;
    var receiveSiteID = undefined;

    function getResult(getSendSiteID, getReceiveSiteID) {
        if (getSendSiteID != null) {
            sendSiteID = getSendSiteID;
        }
        if (getReceiveSiteID != null) {
            receiveSiteID = getReceiveSiteID;
        }
    }

    function sureButtonClick() {
        function returnMain() {
            User.Main.onCloseClick([true]);
        }

        if (sendSiteID == "-1" || sendSiteID == undefined || receiveSiteID == "-1" || receiveSiteID == undefined) {
            showDialog("dialog", "警告", "您的站点选择不正确", true, returnMain);
        } else {
            createPackage(true, sendSiteID, receiveSiteID);//创建分拣员包裹
        }
    }

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllBranch/",
        success: function (data) {
            showDialog("dialog", "请选择包裹收发站点", <SelectSiteDialog getResult={getResult}
                                                                data={data}/>, true, sureButtonClick);
            //弹出选择框
        }.bind(this),
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "获取中转站点信息出错,请重试");
        }
    })
}

/**
 * CreateAPackage（fromID，toID，employeesID，isSorter，token）
 * 如果isSorter==1 就是分拣员 fromID toID对应物流信息
 * isSorter==0 的话就是快递员打包 如果fromID==1 为派送包 fromID==0为揽收包 toID无意义 随便填
 * @param isSend
 */
function createPackage(isSend, fromAddressID, toAddressID) {
    var isSort;
    var fromID;
    var toID;
    if (User.job == 1) {//快递员
        isSort = 0;
        if (isSend) {
            fromID = 1;
        } else {
            fromID = 0;
        }
        toID = 10;
    } else if (User.job == 2) {//分拣员
        isSort = 1;
        fromID = fromAddressID;
        toID = toAddressID;
    }

    createPackageAjax(fromID, toID, isSort, isSend);
}

/**
 * package请求网络创建
 * @param fromID
 * @param toID
 * @param isSorter
 * @param isSend
 */
function createPackageAjax(fromID, toID, isSorter, isSend) {
    //创建包裹返回
    //{
    // "closeTime":"Sun Jun 26 19:59:33 CST 2016",
    // "employeesID":71,"employeesName":"宋超","id":31187275451409
    // }
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/createPackage/fromID/" + fromID + "/toID/" + toID + "/employeesID/" + User.id + "/isSorter/" + isSorter,
        success: function (data) {
            if (User.job == 1) {
                if (isSend) {
                    User.sendPackageId = data.id;
                } else {
                    User.recvPackageId = data.id;
                }
            } else if (User.job == 2) {
                User.sortPakcageID = data.id;
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "创建包裹失败 isSend:" + isSend, true);
        }
    })
}

/**
 * 获取package
 * @param packageId
 */
function getPackage(packageId) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/getPackageInfoById/" + packageId,
        success: function (data) {

        },
        error: function (data) {

        }
    })
}

/**
 * 打包提交
 * @param expresses
 */
function expressToPackage(expresses) {
    Tools.myAjax({
        type: "post",
        url: "/REST/Domain/PackageLoadIntoPackage",
        data: expresses,
        success: function (data) {
            console.info(data);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog", "错误", "打包失败,请重试", true);
        }
    })
}

/**
 * 从包裹中获取快递列表
 * @param packageID
 */
function getExpressFromPackage(packageID, getSuccess) {
    Tools.myAjax({
        type: "get",
        url: "/REST/Domain/searchExpressInPackageById/" + packageID,
        success: function (data) {
            if (data.length == 0) {
                showDialog("dialog", "提醒", "包裹中没有快递", true);
            } else {
                getSuccess(data);
            }
        },
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "获取快递包裹中的快递列表错误,请重试", true);
        }
    })
}

/**
 * 请输入包裹id弹出
 * @param sureButton
 * @param onChange
 */
function placeInputPackageID(sureButton, onChange) {

    var inputStyle = {width: "100%"};
    showDialog(
        "dialog", "请输入要拆的包裹ID",
        (
            <input onChange={onChange} style={inputStyle} placeholder="请输入包裹ID"/>
        ),
        true,
        sureButton
    );
}



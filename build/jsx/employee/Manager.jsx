/**
 * Created by songchao on 16/6/28.
 */

/**
 * 经理部分容器
 * 经理的职责有:
 * 增删员工,站点管理,修改快递信息
 */
var ManagerComponent = React.createClass({
    onDoClick: function (child1, child2,child3) {
        if (child1 != null) {
            this.setState({child1: child1});
        }
        if (child2 != null) {
            this.setState({child2: child2});
        }
        if(child3 != null){
            this.setState({child3:child3});
        }
    },
    getInitialState: function () {
        return {
            child1: [
                <EmployeeManagerButton key="employeemanagerbutton" onDoClick={this.onDoClick}/>,
                <SiteWorkloadButton key="siteworkloadbutton" onDoClick={this.onDoClick}/>
            ],
            child2: [],
            child3: [],
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    render: function () {
        return (
            <div>
                <ButtonContainer key="managerbuttoncontainer"
                                 child1={this.state.child1}
                                 child2={this.state.child2}
                                 child3={this.state.child3}
                />
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebuttonmanager"/>
            </div>
        );
    }
});

/**
 * 经理管理员工的四个功能
 */
var EmployeeManagerComponent = React.createClass({
    propTypes: {
        siteID: React.PropTypes.string
    },
    componentDidMount: function () {
        getAllEmployeeBySiteID(this.props.siteID,this.getEmployeeSuccess);
    },
    componentDidUpdate: function () {
        getAllEmployeeBySiteID(this.props.siteID,this.getEmployeeSuccess);
    },
    getEmployeeSuccess: function (data) {
        if(this.isMounted()){
            this.props.onDoClick(null,null,[<EmployeeListComponent data={data} />]);
        }
    },
    addEmployee: function () {
        //跳转到注册页面直接注册员工
        ReactDOM.render(
            <Login isLogin="false" key="noLogin" siteID={this.props.siteID}/>,
            document.getElementById("login_container")
        );
    },
    render: function () {
        return (
            <div key="employeemanagercomponent" className="employee_manager_component">
                <button key="addemployee" onClick={this.addEmployee} className="btn btn-default">增加员工</button>
            </div>
        );
    }
});


var EmployeeListComponent = React.createClass({
    propTypes:{
        data:React.PropTypes.array
    },
    getInitialState: function () {
        return {
            data:this.props.data
        };
    },
    componentDidUpdate:function () {
        this.setState({data:this.props.data});
    },
    onDelClick: function (e) {
        var index = e.target.dataset.index;
        var employee = this.state.data[index];
        function sureDel() {
            delEmployee(employee,index,this.delSuccess);
        }
        showDialog("dialog","警告","确定删除这个员工?",true,sureDel);
        e.stopPropagation();//阻止时间冒泡
    },
    delSuccess: function (index) {
        var employeese = this.state.data;
        employeese.splice(index,1);
        this.setState({data:employeese});
    },
    onLiClick: function (e) {
        var index = e.target.dataset.index;
        var employee = this.state.data[index];
        //跳转到注册页面直接注册员工
        ReactDOM.render(
            <Login isLogin="false" isUpdate={true} key="noLogin" employee={employee} siteID={this.props.siteID}/>,
            document.getElementById("login_container")
        );
    },
    render: function () {
        return (
            <ul key="employeelistcom" className="manager_employee_list">
                {this.state.data.map(function (data, index) {
                    return (
                        <li key={"li"+index} data-index={index} onClick={this.onLiClick}>
                            <span key="span">{data.name + "  " + data.jobText}</span>
                            <img data-index={index} onClick={this.onDelClick} key="delimg" src="../images/manager/delete.png"/>
                        </li>
                    )
                }.bind(this))}
            </ul>
        );
    }
});

function getSiteWorkload(siteID){
    showWorkload(siteID);
}

/**
 * 删除员工
 * @param employee
 * @param index
 * @param onSuccess
 */
function delEmployee(employee,index,onSuccess) {
    Tools.myAjax({
        type:"get",
        url:"/REST/Domain/deleteEmployee/"+employee.id,
        success: function (data) {
            if(data.deleteEmployee == "true"){
                showDialog("dialog","恭喜","删除员工成功",true);
                onSuccess(index);
            }else{
                showDialog("dialog","警告","删除员工错误,请重试",true);
            }
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog","错误","删除员工错误,请重试",true);
        }
    })
}
/**
 * 通过站点id获取它的所有员工
 * /REST/Domain/findEmployeesInfoByOutletsId/{outletId}/{token}
 * @param siteID
 */
function getAllEmployeeBySiteID(siteID,onSuccess) {
    Tools.myAjax({
        type:"get",
        url:"/REST/Domain/findEmployeesInfoByOutletsId/"+siteID,
        success: function (data) {
            console.info(data);
            onSuccess(data);
        },
        error: function (data) {
            console.error(data);
            showDialog("dialog","错误","获取员工信息出错,请重试",true);
        }
    })
}

/**
 * 弹出请选择站点的窗口
 */
function placeChoiceSite(sureButton) {
    ///Misc/getAllBranch/{token}
    //返回：List<OutletsEntity>
    var sendSiteID = undefined;

    function getResult(getSendSiteID) {
        if (getSendSiteID != null) {
            sendSiteID = getSendSiteID;
        }
    }

    function sureButtonClick() {
        if (sendSiteID == "-1" || sendSiteID == undefined) {
            showDialog("dialog", "警告", "您的站点选择不正确", true, returnMain);
        } else {
            //选择站点之后,从这里跳转
            sureButton(sendSiteID);
        }
    }

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllBranch/",
        success: function (data) {
            if (data.length != 0) {
                showDialog("dialog", "请选择站点", <SelectSiteDialog isPackage={false} getResult={getResult}
                                                                    data={data}/>, true, sureButtonClick);
            } else {
                showDialog("dialog", "警告", "获取中转站点信息出错,请重试", true);
            }
            //弹出选择框
        }.bind(this),
        error: function (data) {
            console.info(data);
            showDialog("dialog", "错误", "获取中转站点信息出错,请重试", true);
        }
    })
}


/**
 * 经理管理员工按钮
 */
var EmployeeManagerButton = React.createClass({
    getInitialState: function () {
        return {
            siteID: "",
        }
    },
    setSiteID: function (siteID) {
        this.setState({siteID: siteID});
        this.props.onDoClick(null, [<EmployeeManagerComponent onDoClick={this.props.onDoClick} siteID={siteID}/>]);
    },
    onClick: function () {
        placeChoiceSite(this.setSiteID);
    },

    render: function () {
        return (
            <div key="employeemanagerbutton" className="col-xs-6 send_express_button" onClick={this.onClick}>
                <div key="imgcontainer" className="package_in_icon_container employee_manager_button">
                    <img key="img" src="../images/manager/managerpeople.png"/>
                </div>
                <p key="textshow" className="send_express_text">员工管理</p>
            </div>
        );
    }
});

/**
 * 站点工作量查询按钮
 */
var SiteWorkloadButton = React.createClass({

    onClick: function () {
        placeChoiceSite(getSiteWorkload);
    },
    render: function () {
        return (
            <div key="siteworkloadbutton" className="col-xs-6 send_express_button" onClick={this.onClick}>
                <div key="container" className="package_in_icon_container employee_manager_button">
                    <img key="img" src="../images/main/workload.png"/>
                </div>
                <p key="showtext" className="send_express_text">站点工作量</p>
            </div>
        );
    }
});

/**
 * Created by songchao on 16/6/19.
 */

var BeautifulSelect = React.createClass({displayName: "BeautifulSelect",
    render: function () {
        return (
            React.createElement("div", null)
        );
    }
});

var EditAddressComponent = React.createClass({displayName: "EditAddressComponent",
    statics: {
        Address: {
            regionId: "",
            address: "",
            customerId: "",
            name: "",
            telephone: "",
            rank: "",
            status: ""
        }
    },
    propTypes: {
        isSend: React.PropTypes.bool,
        isNew: React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            placeholderName: this.props.isSend ? "发件人姓名" : "收件人姓名",
            placeholderTel: this.props.isSend ? "发件人电话号" : "收件人电话号",
            headText: this.props.isSend ? "编辑发件人地址" : "编辑收件人地址",
            errorMessage: "",
            isDefault: this.props.addressRank == 0 ? true : false,
            
            nameValue: this.props.isNew ? "":this.props.addressUserName,
            telephoneValue: this.props.isNew?"":this.props.addressTelephone,
            detailValue: this.props.isNew?"":this.props.addressDetail,
            province: [],
            city: [],
            area: [],
        }
    },
    componentDidMount: function () {
        if (!this.props.isNew) {
            getStartValue(this, this.props.province, this.props.city, this.props.region);
        } else {
            Tools.myAjax({
                type: "get",
                url: "/REST/Misc/getAllProvince",
                success: function (message) {
                    var provinces = [];
                    for (var key in message) {
                        provinces.push(message[key]);
                    }
                    this.setState({province: provinces});
                }.bind(this),
                error: function () {

                }.bind(this)
            });
        }
    },
    handleProvinceChange(event){
        var value = event.target.value;
        this.setState({provinceValue: value});
        //获取城市
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getCityList/" + value,
            success: function (message) {
                var citys = [];
                for (var key in message) {
                    citys.push(message[key]);
                }
                this.setState({city: citys});
            }.bind(this),
            error: function () {

            }.bind(this)
        })
    },
    handleCityChange(event){
        var value = event.target.value;
        this.setState({cityValue: value});
        //获取区域
        Tools.myAjax({
            type: "get",
            url: "/REST/Misc/getRegionList/" + value,
            success: function (message) {
                var areas = [];
                for (var key in message) {
                    areas.push(message[key]);
                }
                this.setState({area: areas});
            }.bind(this),
            error: function () {

            }.bind(this)
        })
    },
    handleAreaChange(event){
        var value = event.target.value;
        this.setState({areaValue: value});
    },
    handleSubmitClick: function () {
        var Address = EditAddressComponent.Address;
        Address.address = this.state.detailValue + "";
        Address.name = this.state.nameValue + "";
        Address.telephone = this.state.telephoneValue + "";

        var rank = this.state.isDefault ? 0 : 1;
        if (this.props.addressRank == 0) {
            rank = 0;
        }
        Address.rank = rank;
        if(!this.props.isNew) {
            Address.id = parseInt(this.props.aid);
        }
        Address.regionId = parseInt(this.state.areaValue);
        Address.customerId = parseInt(User.id);

        var status;
        if (this.props.isSend) {
            status = 1;
        } else {
            status = 2;
        }
        Address.status = status;

        var url = this.props.isNew? "/REST/Misc/newAddress":"/REST/Misc/updateAddress";
        Tools.myAjax({
            type: "post",
            url: url,
            data: Address,
            success: function (data) {
                if(this.props.isNew){//如果是新建地址
                    if(data.newAddstate == "true"){
                        showDialog("dialog", "恭喜", "地址新增成功", true, this.onSubmitSuccess);
                    }else{
                        showDialog("dialog", "警告", "地址新增失败,请重试", true);
                    }
                }else {
                    if (data.updateAddstate == "true") {
                        showDialog("dialog", "恭喜", "地址更新成功", true, this.onSubmitSuccess);
                    } else {
                        showDialog("dialog", "警告", "地址更新失败,请重试", true);
                    }
                }
            }.bind(this),
            error: function (data) {
                console.error(data);
                showDialog("dialog", "警告", "地址提交失败,请重试", true);
            }.bind(this)
        })
    },
    onSubmitSuccess: function () {
        this.props.onAddressSubmitSuccess();
    },
    handleNameChange: function (e) {
        var value = e.target.value;
        this.setState({nameValue: value});
    },
    handleTelChange: function (e) {
        var value = e.target.value;
        if (value.length > 11) {
            this.setState({errorMessage: "电话号不能大于11位"});
        } else {
            this.setState({errorMessage: "", telephoneValue: value});
        }
    },
    handleDetailChange: function (e) {
        var value = e.target.value;
        this.setState({detailValue: value});
    },
    defaultChange: function (e) {
        if (this.state.isDefault) {
            this.setState({isDefault: false});
        } else {
            this.setState({isDefault: true});
        }
    },
    render: function () {
        var style = {width: "33%"};
        var pStyle = {textAlign: "center"};
        var divStyle = {textAlign: "right"};
        return (
            React.createElement("form", {className: "padding-l-r-20"}, 
                React.createElement("p", {key: "p1", className: "address_head"}, this.state.headText), 
                React.createElement("input", {key: "input1", type: "text", onChange: this.handleNameChange, value: this.state.nameValue, 
                       className: "login_name", placeholder: this.state.placeholderName}), 
                React.createElement("input", {key: "input2", type: "text", onChange: this.handleTelChange, value: this.state.telephoneValue, 
                       className: "login_name", placeholder: this.state.placeholderTel}), 

                React.createElement("select", {key: "select1", style: style, onChange: this.handleProvinceChange, 
                        value: this.state.provinceValue, className: "form-control float_left"}, 
                    React.createElement("option", {value: "-1"}, "选择省"), 
                    this.state.province.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.pid}, data.pname)
                    })
                ), 
                React.createElement("select", {key: "select2", style: style, onChange: this.handleCityChange, value: this.state.cityValue, 
                        className: "form-control float_left"}, 
                    React.createElement("option", {key: "-1", value: "-1"}, "选择市"), 
                    this.state.city.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.cid}, data.cname)
                    })
                ), 
                React.createElement("select", {key: "select3", style: style, onChange: this.handleAreaChange, value: this.state.areaValue, 
                        className: "form-control float_left"}, 
                    React.createElement("option", {key: "-1", value: "-1"}, "选择区"), 
                    this.state.area.map(function (data, index) {
                        return React.createElement("option", {key: index, value: data.id}, data.area)
                    })
                ), 

                React.createElement("div", {className: "clearfix"}), 
                React.createElement("input", {key: "input3", type: "text", onChange: this.handleDetailChange, value: this.state.detailValue, 
                       className: "login_name", placeholder: "详细地址"}), 
                this.props.addressRank == 0 ? "" :
                    (
                        React.createElement(FillWidthDiv, {key: "div1", style: divStyle}, 
                            React.createElement("label", null, React.createElement("input", {key: "input5", checked: this.state.isDefault, onChange: this.defaultChange, 
                                          type: "radio"}), "设为默认")
                        )
                    ), 
                
                React.createElement("input", {key: "input4", type: "button", onClick: this.handleSubmitClick, className: "login_submit", value: "提交"}), 
                React.createElement(FillWidthP, {key: "p2", style: pStyle}, this.state.errorMessage)
            )
        );
    }

});

function getStartValue(the, province, city, area) {
    var provinceKey;
    var cityKey;
    var areaKey;

    Tools.myAjax({
        type: "get",
        url: "/REST/Misc/getAllProvince",
        success: function (message) {
            var provinces = [];
            for (var key in message) {
                provinces.push(message[key]);
                if (message[key].pname == province) {
                    provinceKey = message[key].pid;
                }
            }
            the.setState({province: provinces, provinceValue: provinceKey});
            //------开始获取市信息
            Tools.myAjax({
                type: "get",
                url: "/REST/Misc/getCityList/" + provinceKey,
                success: function (message) {
                    var citys = [];
                    for (var key in message) {
                        citys.push(message[key]);
                        if (message[key].cname == city) {
                            cityKey = message[key].cid;
                        }
                    }
                    the.setState({city: citys, cityValue: cityKey});

                    //-----------------开始获取区域信息
                    //获取区域
                    Tools.myAjax({
                        type: "get",
                        url: "/REST/Misc/getRegionList/" + cityKey,
                        success: function (message) {
                            var areas = [];
                            for (var key in message) {
                                areas.push(message[key]);
                                if (message[key].area == area) {
                                    areaKey = message[key].id;
                                }
                            }
                            the.setState({area: areas, areaValue: areaKey});
                        }.bind(the),
                        error: function () {

                        }.bind(the)
                    });


                }.bind(the),
                error: function () {

                }.bind(the)
            });
        }.bind(the),
        error: function () {

        }.bind(the)
    });
}





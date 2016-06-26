/**
 * Created by songchao on 16/6/21.
 */

var SearchResult = React.createClass({
    getInitialState: function () {
        var config = {};
        config.mapicon = "../images/search/mapicon.png";
        return config;
    },
    onCloseClick: function () {
        User.Main.onCloseClick([true]);//传入true参数,默认跳转到Main本身页面
    },
    iconOn: function () {
        this.setState({mapicon:"../images/search/mapicon_on.png"});
    },
    iconOut: function () {
        this.setState({mapicon:"../images/search/mapicon.png"});
    },
    iconClick: function () {
        Tools.myAjax({
            type:"get",
            url:"/REST/Domain/getSendEmployeesInfos/"+this.props.searchID,
            success: function (data) {
                if(data.length == 0){
                    showDialog("dialog","警告","没有轨迹点信息",true);
                    return;
                }
                showBaiduMap(data);
            },
            error: function (data) {
                console.error(data);
            }
        })
    },
    render: function () {
        return (
            <div className="address_container">
                <div key="searchHead" className="row address_head">
                    <span key="headspan">{this.props.searchID}的物流信息</span>
                    <img key="headicon" title="实时轨迹地图" onClick={this.iconClick} onMouseOver={this.iconOn} onMouseOut={this.iconOut} className="address_add_img" src={this.state.mapicon} />
                </div>
                {this.props.searchResult.map(function (data, index) {
                     return <p key={index}>{data.info}</p>
                })}
                <BeforeButton key="searchbeforebutton" onCloseClick={this.onCloseClick} />
            </div>
        );
    }
});
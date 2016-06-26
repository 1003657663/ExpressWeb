/**
 * Created by songchao on 16/6/26.
 */

/**
 * 打包和拆包的容器
 */
var Package = React.createClass({
    propTypes: {
        isPackageIn:React.PropTypes.bool,
    },
    getInitialState: function () {
        return {
            expresses:["13245648","54444568798","8678746545"],
        }
    },
    onCloseClick: function () {
        this.props.onCloseClick([true]);
    },
    componentDidMount: function () {
        
    },
    render: function () {
        return (
            <div className="row">
                <div key="headtext" className="address_head">
                    <span>{this.props.isPackageIn?"快件打包":"快件拆包"}</span>
                </div>
                <ul key="packagelist" className="package_list">
                    {this.state.expresses.length==0?<li>请在顶部搜索框输入并点击+添加</li>:""}
                    {this.state.expresses.map(function (data, index) {
                        return <li key={index}>{data}</li>
                    })}
                </ul>
                <BeforeButton onCloseClick={this.onCloseClick} key="beforebutton"/>
            </div>
        );
    }
});



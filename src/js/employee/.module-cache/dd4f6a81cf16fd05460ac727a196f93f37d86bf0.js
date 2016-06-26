/**
 * Created by songchao on 16/6/25.
 */

var Workload = React.createClass({displayName: "Workload",

    componentDidMount: function () {
        setTimeout(createCloseTo, 1000);
        $("#baidu_map").attr("class", "baidu_map baidu_map_on");
    },
    render: function () {
        return (
            React.createElement("div", null)
        );
    }
});
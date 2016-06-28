/**
 * Created by songchao on 16/6/22.
 */
var map = new BMap.Map("baidu_map");
var point = new BMap.Point(116.404, 39.915);  // 创建点坐标
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom(true);
var Map = {
    ak: "ynKpoQfTW9Zc93p4T4vWafHI6nFpIubO",
    serviceID: "115498"
};

function showBaiduMap(data) {
    getPoints(data);
}

/**
 * 通过给定数据,返回折线类
 * @param points
 * @returns {BMap.Polyline}
 */
function getPolyline(points) {
    var newPoints = [];
    points.map(function (data, index) {
        newPoints.push(new BMap.Point(data[0], data[1]));
    });

    var polyline = new BMap.Polyline(
        newPoints,
        {strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5}
    );

    return polyline;
}

/**
 * 把轨迹绘制到地图上
 * @param points
 */
function startShow(points) {
    if(points.length == 0){
        showDialog("dialog","警告","您查询的快递没有轨迹",true);
        return;
    }
    var polyline = getPolyline(points);
    var centerPoint = points[Math.round(points.length / 2)];
    var point = new BMap.Point(centerPoint[0], centerPoint[1]);
    map.centerAndZoom(point, 20);
    map.addOverlay(polyline);

    //-------------向百度地图中添加标记
    var startIcon = new BMap.Icon("../images/map/start.png", new BMap.Size(25, 25));
    var endIcon = new BMap.Icon("../images/map/end.png", new BMap.Size(25, 25));
    var startMarkPoint = new BMap.Point(points[0][1], points[0][0]);
    var endMarkPoint = new BMap.Point(points[points.length - 1][1], points[points.length - 1][0]);
    var startmarker = new BMap.Marker(startMarkPoint, {icon: startIcon});
    var endmarker = new BMap.Marker(endMarkPoint, {icon: endIcon});
    map.addOverlay(startmarker);
    map.addOverlay(endmarker);

    setTimeout(createCloseTo, 1000);
    $("#baidu_map").attr("class", "baidu_map baidu_map_on");
}

function createCloseTo(){
    ReactDOM.render(
        <BeforeButton onCloseClick={onCloseBaiduMap}/>,
        document.getElementsByClassName("baidu_map_close")[0]);
}
function onCloseBaiduMap() {
    ReactDOM.render(
        <EmptyComponent key="emptycom"/>,
        document.getElementsByClassName("baidu_map_close")[0]);
    $("#baidu_map").attr("class", "baidu_map");
}

/**
 * 通过网络循环获取点
 * @param data
 */
function getPoints(data) {
    var points = [];
    var i = 0;
    var length = data.length;
    successOne(undefined, data);
    function successOne(data, employeeData) {
        if (i > 0) {
            points.push(data);
        }
        if (i < length) {//数据未加载完成
            if (employeeData[i].job == 1 || employeeData[i].job == 3) {
                getOneHistoryPoints(employeeData[i].employeeId, successOne, successOne, employeeData);
            }
        } else {
            //数据加载完成,分析数据
            handlePoints(points);
        }
        i++;
    }

    function getPointSuccess(data) {
        points.push(data.points);
    }
}

/**
 * 拿到的数据点分析,取出其中的x,y值
 */
function handlePoints(points) {
    if (points.length == 0) {
        showDialog("dialog", "警告", "无法获取快递轨迹点,请重试", true);
        return;
    }
    var realPoints = [];
    for (var i = 0; i < points.length; i++) {
        var p = points[i].points;
        for (var h = 0; h < p.length; h++) {
            realPoints.push(p[h].location);
        }
    }
    //处理的数据显示到地图上
    startShow(realPoints);
}

/**
 * 获取Unix时间,就是1970到现在过去的秒数
 * @returns {number}
 */
function getUnixTime() {
    var date = new Date();
    return Math.round(new Date().getTime() / 1000);
}

/**
 * 获取单个的历史数据并重新调用循环
 * @param entity_name
 * @param success
 * @param error
 * @param employeeData
 */
function getOneHistoryPoints(entity_name, success, error, employeeData) {
    var url = "http://api.map.baidu.com/trace/v2/track/gethistory";
    Tools.myAjax({
        type: "get",
        url: url,
        dataType: "jsonp",
        data: {
            ak: Map.ak,
            service_id: Map.serviceID,
            start_time: getUnixTime() - 36 * 3600,
            end_time: getUnixTime() - 12 * 3600,
            entity_name: entity_name,
            is_processed: 1,
            page_size: 5000
        },
        success: function (data) {
            if (data.status != 0) {
                console.error({"获取历史轨迹点出错": data});
                error(data, employeeData);
            }
            success(data, employeeData);
        },
        error: function (data) {
            console.error({"获取历史轨迹点出错:": data});
            error(data, employeeData);
        }
    }, false);
}

/**
 * 员工注册成功之后,把id加入鹰眼轨迹中
 * @param entity_name
 * @param success
 * @param error
 */
function addEntity(entity_name, success, error) {
    var url = "http://api.map.baidu.com/trace/v2/entity/add";
    //参数是ak,serviceid,entityname
    Tools.myAjax({
        type: "post",
        url: url,
        data: {
            entity_name: entity_name,
            ak: Map.ak,
            service_id: Map.serviceID
        },
        success: function (data) {
            if (data.status != 0) {
                //失败
                console.error("添加entity_name失败");
                error(data);
            }
            success(data);
        },
        error: function (data) {
            error(data);
        }
    })
}

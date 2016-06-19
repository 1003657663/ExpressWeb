/**
 * Created by songchao on 16/6/15.
 */
$.support.cors = true;
var User = {
    isLogin:false,
    name:"",
    tel:"",
    password:"",
    token:""
};

var Url = {
    //header:"http://10.101.242.35:8080"
    header:"http://182.254.214.97:8080/ExTrace_Server"
};

var Test = {
    addressList:[
        {userName: "宋超", telephone: "12345678909", address: "河南省啦啦啦", detail: "508宿舍"},
        {userName: "宋", telephone: "111111111111", address: "山东省", detail: "508宿舍"}
    ],
    historyList:[
        {historyID:12345,historySendName:"xiaohua",historySendTime:"2016-05-08 10:52:41",historyReceiveName:"xiaoming",historyReceiveTime:"2016-02-03 15:56:12"},
        {historyID:12345,historySendName:"lallaa",historySendTime:"2016-01-04 10:52:41",historyReceiveName:"wowowow",historyReceiveTime:"2016-05-03 11:56:12"},

    ]
}
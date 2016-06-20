/**
 * Created by songchao on 16/6/15.
 */
var Tools = {
    //---------合并两个类2 ==> 1
    extend: function(obj1,obj2){
        for(var key in obj2){
            obj1[key] = obj2[key];
        }
        return obj1;
    },
    extendNoReplace: function(obj1,obj2){
        for(var key in obj2){
            if(obj1.hasOwnProperty(key))
                continue;
            obj1[key] = obj2[key];
        }
        return obj1;
    },

    isNum: function (num) {
        if(!isNaN(num)){
            return true;
        }else{
            return false;
        }
    },
    myAjax: function (config) {//data是对象类型
        var con = ["type","url","data","success","error"];
        for(var i=0;i<con.length;i++){
            if(config[con[i]]==undefined && i != 2){
                console.error("myajax config 参数错误");
                return;
            }
        }
        var type = config[con[0]];
        var url = Url.header + config[con[1]];
        var data = config[con[2]];
        var success = config[con[3]];
        var error = config[con[4]];

        if(User.isLogin) {
            if (type == "get" || type == "GET") {
                if (url.substring(url.length - 1, url.length) == '/') {
                    url = url + User.token;
                } else {
                    url = url + "/" +User.token;
                }
            }
        }
        $.ajax({
            type:type,
            url:url,
            data:JSON.stringify(data),
            dataType:'json',
            heanders: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",//"application/json",
                "Access-Control-Request-Method":type
            },
            success:success,
            error:error
        });
    },
    classSet: function () {
        var result = "";
        for(var i=0;i<arguments.length;i++){
            if(typeof arguments[i] == "string"){
                result += " "+arguments[i];
            }
            if(Array.isArray(arguments[i])){
                var ary = arguments[i];
                for(index in ary){
                    result += " "+ary[index];
                }
            }
        }
        return result;
    }
};
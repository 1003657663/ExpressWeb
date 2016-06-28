/**
 * Created by songchao on 16/6/15.
 */
$.support.cors = true;
//给数组添加是否包含方法
Array.prototype.contains = function (text) {
    var length = this.length;
    for(var i=0;i<length;i++){
        if(this[i] == text){
            return true;
        }
    }
    return false;
};

var User = {
    isLogin:false,
    name:null,
    telephone:null,
    password:null,
    token:null,
    id:null,
    job:null,//1,快递员,2分拣员,3司机
    jobText:null,
    outletsId:null,
    status:null,
    recvPackageId:null,
    sendPackageId:null,
    sortPakcageID:null,
    
    //用户组件
    UserInfo:null,
    //Navbar
    NavBar:null,
    //Main
    Main:null,
    //打包拆包组件
    Package:null,

    cookieLogin:function () {
        this.isLogin = getCookieValue("employee_isLogin") == "true"?true:false;
        this.name = getCookieValue("employee_name");
        
        this.telephone = getCookieValue("employee_telephone");
        this.password = getCookieValue("employee_password");
        this.token = getCookieValue("employee_token");
        this.id = getCookieValue("employee_id");
        this.job = getCookieValue("employee_job");
        this.jobText = getCookieValue("employee_jobText");
        this.outletsId = getCookieValue("employee_outletsId");
        this.status = getCookieValue("status");
    },
    login:function (name, telephone, password, token,
                    id,job,jobText,outletsId,status) {
        this.isLogin = true;
        this.name = name;
        this.telephone = telephone;
        this.password = password;
        this.token = token;
        this.id = id;
        this.job = job;
        this.jobText = jobText;
        this.outletsId = outletsId;
        this.status = status;

        this.NavBar.setState({isLogin:true});
        this.UserInfo.setState({name:name,telephone:telephone,isLogin:true});
    },

    logout:function () {
        this.isLogin = false;
        this.name = null;
        this.telephone = null;
        this.id = null;
        this.password = null;
        this.token = null;
        this.UserInfo.setState({isLogin: false});
        this.NavBar.setState({name:null,telephone:null,isLogin: false});
    }
};


var Url = {
    //header:"http://10.101.242.35:8080"
    //header:"http://182.254.214.97:8080/ExTrace_Server"
    header:"http://127.0.0.1:8080/ExTrace_Server"
};

//初始登录
User.cookieLogin();
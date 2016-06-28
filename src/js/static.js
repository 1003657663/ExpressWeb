/**
 * Created by songchao on 16/6/15.
 */
//$.support.cors = true;
var User = {
    isLogin:false,
    name:"",
    telephone:"",
    password:"",
    token:"",
    id:"",
    
    //用户组件
    UserInfo:"",
    //Navbar
    NavBar:"",
    //Main
    Main:"",

    cookieLogin:function () {
        this.isLogin = JSON.parse(getCookieValue("isLogin"));
        this.name = getCookieValue("name");
        this.telephone = getCookieValue("telephone");
        this.password = getCookieValue("password");
        this.token = getCookieValue("token");
        this.id = getCookieValue("id");
    },
    login:function (name, telephone, password, token, id) {
        this.isLogin = true;
        this.name = name;
        this.telephone = telephone;
        this.password = password;
        this.token = token;
        this.id = id;
        this.NavBar.setState({isLogin:true});
        this.UserInfo.setState({name:name,telephone:telephone,isLogin:true});
    },

    logout:function () {
        this.isLogin = false;
        this.name = "";
        this.telephone = "";
        this.id = "";
        this.password = "";
        this.token = "";
        this.UserInfo.setState({isLogin: false});
        this.NavBar.setState({name:"",telephone:"",isLogin: false});
    }
};


var Url = {
    //header:"http://10.101.242.35:8080"
    header:"http://182.254.214.97:8080/ExTrace_Server"
    //header:"http://127.0.0.1:8080/ExTrace_Server"
};

//初始登录
User.cookieLogin();
/**
 * Created by songchao on 16/6/15.
 */
//---火狐跨域
try {
    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
} catch (e) {
    alert("Permission UniversalBrowserRead denied.");
}

var User = {
    isLogin:false,
    name:"",
    tel:"",
    password:""
};

var Url = {
    //header:"http://10.101.242.35:8080"
    header:"http://182.254.214.97:8080/ExTrace_Server"
};
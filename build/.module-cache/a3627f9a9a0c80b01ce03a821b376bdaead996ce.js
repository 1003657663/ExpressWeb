/**
 * Created by chao on 2016/6/14.
 */
var names = ["chao","song","lala"];
ReactDOM.render(
    React.createElement("div", null, 
    
        names.map(function (data) {
            return React.createElement("h1", {key: "aa"}, "Hello ", data)
        })
    
    ),
    document.getElementById("content")
);
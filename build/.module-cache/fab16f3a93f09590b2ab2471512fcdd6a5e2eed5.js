/**
 * Created by chao on 2016/6/14.
 */
var names = ["chao","song","lala"];
ReactDOM.render(
    React.createElement("div", null, 
    
        names.map(function (data) {
            React.createElement("h1", null, "Hello ", data)
        })
    
    )
);
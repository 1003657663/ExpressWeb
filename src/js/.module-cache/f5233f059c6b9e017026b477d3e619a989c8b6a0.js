/**
 * Created by songchao on 16/6/15.
 */
var Tools = {
    //---------合并两个类2 ==> 1
    extend: function(obj1,obj2){
        for(var key in obj2){
            if(obj1.hasOwnProperty(key))
                continue;
            obj1[key] = obj2[key];
        }
        return obj1;
    }


    
};
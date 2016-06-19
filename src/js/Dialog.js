/**
 * Created by songchao on 16/6/18.
 */

var dialogList = [];//存储所有的dialog的id用于关闭
function closeAllDialog() {
    for(var index in dialogList) {
        $('#'+dialogList[index]).modal('hide');
    }
}

function showDialog(dialogID,dialogHead,dialogContent,hasClose,hasSubmit,submitFunction){
    ReactDOM.render(
        React.createElement(Dialog, {
            dialogID: dialogID, 
             dialogHead: dialogHead, 
              dialogContent: dialogContent, 
               hasClose: hasClose, 
                hasSubmit: hasSubmit, 
                 submitFunction: submitFunction}
        ), document.getElementById("dialog"));
    $("#"+dialogID).modal('show');
}
/**
 * 模态框--参数:id,标题,内容,是否有关闭按钮,按钮的值是什么,是否有提交按钮,提交按钮点击后的反应
 */
var Dialog = React.createClass({displayName: "Dialog",
    getDefaultProps: function () {
        return {hasSubmit:false,submitFunction:""}
    },
    getInitialState:function(){
        var config = {};
        config.dialogID = this.props.dialogID;
        config.dialogHead = this.props.dialogHead;
        config.dialogContent = this.props.dialogContent;
        config.hasClose = this.props.hasClose;
        config.hasSubmit = this.props.hasSubmit;
        config.submitFunction = this.props.submitFunction;
        for(key in config){
            if(config[key] == undefined){
                console.error("dialog 参数有空,请补全:"+key);
                return null;
            }
        }
        dialogList.push(config.dialogID);
        return config;
    },
    componentDidMount: function () {
        $(this.refs.dialog).modal('show');
    },
    handleClick:function (event) {

    },
    submitFunction: function () {
        this.props.submitFunction();
    },
    render: function () {
        var CloseButton = undefined;
        var SubmitButton = undefined;
        if(this.state.hasClose){
            CloseButton = React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.handleClick}, "确定");
        }
        if(this.state.hasSubmit){
            SubmitButton = React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.state.submitFunction}, "提交");
        }
        return (
            //模态框（Modal）
            React.createElement("div", {ref: "dialog", className: "modal fade", id: this.props.dialogID, tabindex: "-1", role: "dialog", "aria-labelledby": "myModalLabel", "aria-hidden": "true"}, 
                React.createElement("div", {className: "modal-dialog"}, 
                    React.createElement("div", {className: "modal-content"}, 
                        React.createElement("div", {className: "modal-header"}, 
                            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": "true"}, 
                                "×"
                            ), 
                            React.createElement("h4", {className: "modal-title", id: "myModalLabel"}, 
                                this.state.dialogHead
                            )
                        ), 
                        React.createElement("div", {className: "modal-body"}, 
                            this.state.dialogContent
                        ), 
                        React.createElement("div", {className: "modal-footer"}, 
                            CloseButton, 
                            SubmitButton
                        )
                    )
                )
            )
        );
    }
});


var Progress = React.createClass({displayName: "Progress",
    render: function () {
        return (
            React.createElement("div", {className: "progress_container"}, 
                React.createElement("img", {src: "../images/progress.png"})
            )
        );
    }
});
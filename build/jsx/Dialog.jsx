/**
 * Created by songchao on 16/6/18.
 */

var dialogList = {};//存储所有的dialog的id用于关闭
/*function closeAllDialog() {
 for (var key in dialogList) {
 $('#' + key).modal('hide');
 }
 }*/

function showDialog(dialogID, dialogHead, dialogContent, hasClose, closeFunction, hasSubmit, submitFunction, isNextClose) {
    if (isNextClose == undefined) {
        isNextClose = true;
    }
    if (dialogList[dialogID] != undefined) {
        dialogList[dialogID].setState({
            dialogID: dialogID,
            dialogHead: dialogHead,
            dialogContent: dialogContent,
            hasClose: hasClose,
            hasSubmit: hasSubmit,
            submitFunction: submitFunction,
            closeFunction: closeFunction,
            isNextClose: isNextClose,
        });
    } else {
        ReactDOM.render(
            <Dialog
                dialogID={dialogID}
                dialogHead={dialogHead}
                dialogContent={dialogContent}
                hasClose={hasClose}
                closeFunction={closeFunction}
                hasSubmit={hasSubmit}
                submitFunction={submitFunction}
                isNextClose={isNextClose}
            />, document.getElementById("dialog"));
    }
}
/**
 * 模态框--参数:id,标题,内容,是否有关闭按钮,按钮的值是什么,是否有提交按钮,提交按钮点击后的反应
 */
var Dialog = React.createClass({
    getDefaultProps: function () {
        return {hasSubmit: false}
    },
    getInitialState: function () {
        var config = {};
        config.dialogID = this.props.dialogID;
        config.dialogHead = this.props.dialogHead;
        config.dialogContent = this.props.dialogContent;
        config.hasClose = this.props.hasClose;
        for (key in config) {
            if (config[key] == undefined) {
                console.error("dialog 参数有空,请补全:" + key);
                return null;
            }
        }
        config.hasSubmit = this.props.hasSubmit;
        config.submitFunction = this.props.submitFunction;
        config.closeFunction = this.props.closeFunction;
        config.isNextClose = this.props.isNextClose;

        dialogList[this.props.dialogID] = this;
        return config;
    },
    componentDidMount: function () {
        $(this.refs.dialog).modal('show');
    },
    componentDidUpdate: function () {
        $(this.refs.dialog).modal('show');
    },
    handleClick: function (event) {
        if (this.state.closeFunction != undefined) {
            this.state.closeFunction();
        }
        $(".modal-backdrop").remove();
    },
    submitFunction: function () {
        if (this.state.submitFunction != undefined) {
            this.state.submitFunction();
        }
    },
    render: function () {
        var CloseButton = undefined;
        var SubmitButton = undefined;
        if (this.state.hasClose) {
            CloseButton =
                <button type="button" className="btn btn-default" data-dismiss={this.state.isNextClose?"modal":""}
                        onClick={this.handleClick}>
                    确定</button>;
        }
        if (this.state.hasSubmit) {
            SubmitButton =
                <button type="button" className="btn btn-primary" onClick={this.state.submitFunction}>提交</button>;
        }
        return (
            //模态框（Modal）
            <div ref="dialog" className="modal fade" id={this.props.dialogID} tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 className="modal-title" id="myModalLabel">
                                {this.state.dialogHead}
                            </h4>
                        </div>
                        <div className="modal-body">
                            {this.state.dialogContent}
                        </div>
                        <div className="modal-footer">
                            {CloseButton}
                            {SubmitButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var Progress = React.createClass({
    render: function () {
        return (
            <div className="progress_container">
                <img src="../images/progress.png"/>
            </div>
        );
    }
});

/**
 * 空组件
 */
var EmptyComponent = React.createClass({
    render: function () {
        return null;
    }
});

function showProgress() {
    ReactDOM.render(
        <Progress />,
        document.getElementById("progress")
    )
    setTimeout(hideProgress, 3000);
}

function hideProgress() {
    ReactDOM.render(
        <EmptyComponent />,
        document.getElementById("progress")
    )
}
function getCtx (selector) {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const componentCtx = ctx.selectComponent(selector);

    if (!componentCtx) {
        console.error('无法找到对应的组件，请按文档说明使用组件');
        return null;
    }
    return componentCtx;
}

function Toast(options) {
    const { selector = '#toast' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}

Toast.hide = function (selector = '#toast') {
    const ctx = getCtx(selector);

    ctx.handleHide();
};

function Message(options) {
    const { selector = '#message' } = options;
    const ctx = getCtx(selector);

    ctx.handleShow(options);
}
function zlMessage(page,{content,type}) {
    let color;
    switch (type) {
        case 'error':
            color ="bg-red"
            break;
        case 'warning':
            color ="bg-orange"
            break;
        case 'success':
            color = "bg-blue"
            break;
        default:
            color = "bg-blue"
            break;
    }
    page.setData({
        msgVal:content,
        bgVal:color,
        isShow:true
    },() => {
        setTimeout(() => {
            page.setData({
                isShow:false,
                msgVal:"",
            })
        },1800)
    })
}

module.exports = {
    $Toast: Toast,
    $Message: Message,
    zlMessage
};
/*
    事件名：srcoll
    含义：滚动条滚动执行，传入滚动的dom元素，如果是undefined，表示切换页面

    事件名：setSrcoll
    含义：设置滚动条距离

    事件名：menuOpen
    含义：左侧菜单是否打开

    事件名：selectToc
    含义：点击toc目录触发
 */

export default (() => {
    // 存储的是事件类型对应的事件处理函数
    // key   是事件类型
    // value 是数组，事件处理函数
    const listeners = {};
    return {
        // 注册一个事件处理函数
        on(type, handler) {
            if (!handler) return;

            if (!listeners[type]) {
                listeners[type] = new Set();
            }
            listeners[type].add(handler);
        },
        // 注册一个一次性的事件处理函数
        once(type, handler) {
            if (!handler) return;

            handler._once = true;
            this.on(type, handler);
        },
        // 触发一个事件类型的所有事件处理函数
        emit(type, ...arg) {
            if (!listeners[type]) return;

            window.listeners = listeners;
            listeners[type].forEach(it => {
                it.apply(this, arg);
                if (it._once) {
                    this.remove(type, it);
                }
            });
            return listeners;
        },
        // 删除一个事件类型的事件处理函数，需传入函数
        remove(type, handler) {
            if (!listeners[type] || !handler) return;

            listeners[type].delete(handler);
        },
        // 清空一个事件类型的所有事件处理函数
        empty(type) {
            if (!type) return;

            listeners[type].clear();
        }
    };
})();

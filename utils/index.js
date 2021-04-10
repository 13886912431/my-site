/**
 * 在下一帧执行回调
 * @param {*} cb
 */
 export function nextFrame(cb) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            cb();
        });
    });
}

/**
 * 日期格式化
 * @param {*} date
 * @param {*} format格式
 */
 export function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
    if (!date) {
        date = new Date();
    } else if (typeof date === "string" || typeof date === "number") {
        date = new Date(date);
    }
    const YYYY = date.getFullYear();
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const DD = ("0" + date.getDate()).slice(-2);
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);
    const ss = ("0" + date.getSeconds()).slice(-2);

    const result = format.replace(/YYYY/, YYYY)
        .replace(/MM/, MM)
        .replace(/DD/, DD)
        .replace(/hh/, hh)
        .replace(/mm/, mm)
        .replace(/ss/, ss)
    return result;
}

export async function delay(duration = 1000) {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

/**
 * 防抖
 * @param {*} func 需要执行的函数
 * @param {*} wait 间隔时间
 */
 export function debounce(func, wait = 300) {
    if (typeof func !== "function") return;
    let timer = null;
    return function (...arg) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arg);
        }, wait);
    };
}

export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 获取一个仓库模块
 * @param {*} param 
 */
export function getStoreModule(defaultValue) {
    return {
        namespaced: true,
        state() {
            return {
                data: defaultValue,
                loading: false,    
            }
        },
        mutations: {
            setLoading(state, payload) {
                state.loading = payload;
            },
            setData(state, payload) {
                state.data = payload;
            }
        },
        actions: {
            async fetchData({ state, commit }, api) {
                if (Array.isArray(defaultValue)) {
                    if (state.data.length > 0) {
                        return;
                    }
                } else {
                    if (state.data) {
                        return;
                    }
                }
                commit('setLoading', true);
                const res = await api();
                commit('setData', res);
                commit('setLoading', false);
            }
        },
    }
}
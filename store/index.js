export default {
    actions: {
        async nuxtServerInit({ dispatch }, { $api: { getSetting } }) {
            // 获取全局设置
            await dispatch('setting/fetchData', getSetting);
        },
    },
};

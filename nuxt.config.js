const env = process.env.NODE_ENV;

export default {
    server: {
        port: env === 'development' ? '3001' : '80',
        host: env === 'development' ? 'localhost' : '0.0.0.0',
    },
    head: {
        title: '刘胤麟的博客',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no',
            },
            { hid: 'description', name: 'description', content: '刘胤麟的博客' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    loading: {
        color: '#6b9eee',
    },

    css: ['element-ui/lib/theme-chalk/index.css', '@/assets/style/common.css'],

    plugins: [
        '@/plugins/element-ui',
        '@/plugins/request',
        '@/plugins/api',
        '@/plugins/initVue',
        '@/plugins/VMdEditor'
    ],

    components: true,

    buildModules: [],

    modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
    axios: {},
    styleResources: {
        less: [
            '@/assets/style/mixin.less',
            '@/assets/style/app.less'
        ],
    },

    build: {},
};

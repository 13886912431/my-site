/**
 * @param {string} refValue ref字符串
 */
export default refValue => {
    if (!refValue) {
        console.error('scroll混合缺少参数');
        return {};
    }
    return {
        mounted() {
            this.$bus.on('setScroll', this._handleSetScroll);
            this.$refs[refValue].addEventListener('scroll', this._handleScroll);
        },
        beforeDestroy() {
            this.$bus.emit('scroll');
            this.$bus.remove('setScroll', this._handleSetScroll);
            this.$refs[refValue].removeEventListener('scroll', this._handleScroll);
        },
        methods: {
            _handleSetScroll(val) {
                this.$refs[refValue].scrollTop = val;
            },
            _handleScroll(e) {
                this.$bus.emit('scroll', e.target);
            },
        },
    };
};

export default (defaultValue = null) => {
    return {
        data() {
            return {
                data: defaultValue,
                loading: true,
            };
        },
        async created() {
            if (typeof this.fetchData !== 'function') {
                console.error('混入fetchData没有fetchData方法');
                return;
            }
            this.loading = true;
            const res = await this.fetchData();
            this.data = res || defaultValue;
            this.loading = false;
        },
    };
};

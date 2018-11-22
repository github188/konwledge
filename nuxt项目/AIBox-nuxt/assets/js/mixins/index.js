export const _rePaint = {
    methods: {
        _rePaint() {
            this.$store.state.isRouterAlive = false;
            this.$nextTick(()=>{
                this.$store.state.isRouterAlive = true;
                console.log('reload')
            })
        }
    }
}
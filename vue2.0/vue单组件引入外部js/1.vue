<template>
    <div>
        <remote-js src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)"></remote-js>
    </div>
</template>

<script>
//    http://blog.csdn.net/sinat_17775997/article/details/55798611
    export default {
        components: {
            'remote-js': {
                render(createElement) {
                    return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
                },
                props: {
                    src: { type: String, required: true },
                },
            },
        },
        mounted(){
//            const s = document.createElement('script');
//            s.type = 'text/javascript';
//            s.src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)";
//            document.body.appendChild(s);
        }
    }
</script>

<style lang="scss" scoped>

</style>
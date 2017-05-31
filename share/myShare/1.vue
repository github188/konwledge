<template>
    <div>
        <div class="bdsharebuttonbox fl">
        <!--<a href="#" class="bds_more" data-cmd="more"></a>-->
        <a href="javascript:void(0)" class="bds_qzone " data-cmd="qzone" title="分享到QQ空间"
        @click="share('qzone')"></a>
        <a href="javascript:void(0)" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"
        @click="share('tsina')"></a>
        <!--<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>-->
        <a href="javascript:void(0)" class="bds_weixin" data-cmd="weixin" title="分享到微信"
        @click="share('weixin')"></a>
        <a href="javascript:void(0)" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"
        @click="share('sqq')"></a>
        </div>

        <!--//微信-->
        <div v-if="weixinFlag" class="bd_weixin_popup">
        <div class="bd_weixin_popup_head">
        <span>分享到微信朋友圈</span>
        <a href="javascript:void(0)" @click="weixinHide" class="bd_weixin_popup_close">×</a>
        </div>
        <div class="bd_weixin_popup_main">
        <img :src="weixinImg"/>
        </div>
        <div class="bd_weixin_popup_foot">
        打开微信，点击底部的“发现”，<br>
        使用“扫一扫”即可将网页分享至朋友圈。
        </div>
        </div>
        <v-bg></v-bg>
    </div>
</template>

<script>
    export default {
        methods:{
            weixinShow(){
                this.$store.state.fullbgFlag=true;
                this.weixinFlag=true;
            },
            weixinHide(){
                this.weixinFlag=false;
                this.$store.state.fullbgFlag=false;
            },
            share(data){
                let urlOrgin=window.location.href;
                let image_id="image_id%3D11e7459f-daa2-dd71-b10e-00163e005b84";

                let shareQQ = "%230-qzone-1-39649-d020d2d2a4e8d1a374a433f596ad1440";
                let shareSina = "%230-tsina-1-52224-397232819ff9a47a7b7e80a40613cfe1";
                let shareQzone = "%230-qzone-1-35177-d020d2d2a4e8d1a374a433f596ad1440";

                let title="聚保整车保保单!用心为您负责!";
                let desc = "";
                let pic = "http://www.jubao56.com/upload_admin/2016-07-05%2010:08:50-banner4_m.jpg";
                if(data=='qzone'){
                    let url = urlOrgin+image_id+shareQzone;
                    window.open("https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"+
                        "?url="+ url+"&title="+title+ "&desc=&summary=&site=&pics="+ pic)
                }
                if(data=='tsina'){
                    let url = urlOrgin+image_id+shareSina;
                    window.open("http://service.weibo.com/share/share.php"+
                        "?url="+ url+"&title="+title+ "&appkey=1343713053"+"&pic="+ pic+"&searchPic=true")
                }
                if(data=='weixin'){
                    this.weixinShow()
                }
                if(data=='sqq'){
                    let url = urlOrgin+image_id+shareQQ;
                    window.open("http://connect.qq.com/widget/shareqq/index.html"+
                        "?url="+ url+"&title="+title+ "&desc=&summary=&site=baidu&pics"+ pic)
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="upload">
    <v-header title="单据上传"></v-header>
    <div class="file_title">上传投保单</div>
    <div class="upload_box">
      <upload :url="$store.state.fileUrl"
              v-model="form_urls"
              :maxLimit="15"
              title="上传盖章后的投保单">
      </upload>
    </div>
    <div class="file_title" v-if="vat_invoice_open && vat_invoice_type==2">开票信息采集表</div>
    <div class="upload_box" v-if="vat_invoice_open && vat_invoice_type==2">
      <upload :url="$store.state.fileUrl"
              v-model="vat_file_urls"
              :onlyOne="true"
              title="盖章/签字后拍照上传（如需开具增值税专用发票，请上传，如已上传过该采集表请忽略）">
      </upload>
    </div>
    <div class="notice" v-show="success">
      <div>
        <p><i class="iconfont icon-duigou"></i><b>上传成功</b></p>
        <p>您的资料我们已收集。工作日期间，我们将在1个工作日内对您的料审核完毕；非工作日期间，我们将在2日内对您的资料审核完毕。有任何问题，请致电40080-59680，聚保将热忱为您服务。</p>
        <router-link class="blue_bg" :to="unPaidOrders" v-touchFeel="{color:'#0fbcf7'}" tag="div">完 成</router-link>
      </div>
    </div>
    <div class="upload_submit blue_bg" v-touchFeel="{color:'#0fbcf7'}" @click="upload()" v-show="!success">{{btn}}</div>
    <Pay ref="pay" v-if="hasPay" :productType="productType" :orderId="$route.query.orderId" :backOrderLink="backOrderLink" :cancelLink="cancelLink"></Pay>
  </div>
</template>

<script>
	import Pay from "./Pay.vue"
//	import UpLoad from 'base/weuiUpload/weuiUpload';
  const upload = ()=>import('base/weuiUpload/weuiUpload')
	import {Toast, Indicator, MessageBox} from 'mint-ui';
	import {spbOrderInfo, ygbOrderInfo, hynbOrderInfo, spbOrderUploadfiles, ygbOrderUploadfiles, hynbOrderUploadfiles} from '../../assets/js/api';

	export default {
		components: {upload, Pay},
		data() {
			return {
				orderId: this.$route.query.orderId, // 订单ID
				product: this.$route.query.product, // 产品类型
				form_urls: [], // 盖章后的投保单照片url数组
				success: false, // 上传成功
				unPaidOrders: "/" + this.$route.query.product + "Orders?type=unpaid",
				hasPay: false,
				vat_file_urls:[],//增值税照片
				vat_invoice_open:false,
				vat_invoice_type:1
			}
		},
		created() {
			switch (this.product) {
				case 'spb':
					this.orderInfoAjax = spbOrderInfo;
					this.uploadAjax = spbOrderUploadfiles;
					this.btn = '提 交';
					break;
				case 'ygb':
					this.orderInfoAjax = ygbOrderInfo;
					this.uploadAjax = ygbOrderUploadfiles;
					this.btn = '提交并支付';
					this.hasPay = true;
					this.productType = 'ygbOrder';
					this.backOrderLink = '/ygbOrders?type=paid';
					this.cancelLink = '/ygbOrders?type=unpaid';
					break;
				case 'hcb':
					this.orderInfoAjax = hynbOrderInfo;
					this.uploadAjax = hynbOrderUploadfiles;
					this.btn = '提交并支付';
					this.hasPay = true;
					this.productType = 'hcb';
					this.backOrderLink = '/hcbOrders?type=paid';
					this.cancelLink = '/hcbOrders?type=unpaid';
					break;
				case 'dchynb':
					this.orderInfoAjax = hynbOrderInfo;
					this.uploadAjax = hynbOrderUploadfiles;
					this.btn = '提交并支付';
					this.hasPay = true;
					this.productType = 'dchynb';
					this.backOrderLink = '/dchynbOrders?type=paid';
					this.cancelLink = '/dchynbOrders?type=unpaid';
					break;
			}
			this.init();
		},
		methods: {
			init() {
				Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
				this.orderInfoAjax(this.orderId).then((res) => {
					Indicator.close();
					if (res.err_code === 0) {
						let data = res.order || res.data;
						if(this.product === 'spb' || this.product === 'hcb' || this.product === 'dchynb'){
							console.log(data);
							this.form_urls = data.form_image_urls || [];
            }else if(this.product === 'ygb'){
							this.form_urls = data.policy_file ? data.policy_file.map((item)=>item.url):[];
            }
            this.vat_invoice_open = data.vat_invoice_open;
						this.vat_invoice_type = data.vat_invoice_type;
						if(this.vat_invoice_type === 2)this.vat_file_urls = data.vat_file_url ? [data.vat_file_url]: [];
					} else {
						Toast({message: res.err_msg || '未知错误', duration: 1000, position: 'bottom'});
					}
				}).catch(() => {
					Indicator.close();
				});
			},
			upload() {
				if (this.form_urls.length === 0) {
					Toast({message: '请上传盖章后的投保单', duration: 1000, position: 'bottom'});
					return false;
				}
				if(this.vat_invoice_open && this.vat_invoice_type == 2 && this.vat_file_urls.length === 0){
					Toast({message: '请上传开票信息采集表', duration: 1000, position: 'bottom'});
					return false;
        }
				let data;
				if (this.product === 'spb' || this.product === 'hcb' || this.product === 'dchynb') {
					data = {
						order_id: this.orderId * 1, // 订单id
						form_urls: this.form_urls, // 盖章后的投保单照片url数组
						vat_file_url: this.vat_file_urls[0]
					}
				} else if (this.product === 'ygb') {
					let list = [];
					this.form_urls.forEach((item) => {
						list.push({
							url: item,
							filename: item.substring(item.lastIndexOf("/") + 1)
						})
					});
					data = {
						order_id: this.orderId * 1, // 订单id
						policy_file: list, // 盖章后的投保单照片url数组
						vat_file_url: this.vat_file_urls[0]
					}
				}
				console.log(data)
				Indicator.open({text: '保单上传中...', spinnerType: 'fading-circle'});
				this.uploadAjax(data).then(res => {
					Indicator.close();
					if (res.err_code === 0) {
						if (this.hasPay) {
							Toast({message: '投保单上传成功', duration: 1000});
							setTimeout(() => {
								this.$refs.pay.open();
							}, 1000);
						} else {
							this.success = true;
						}
					} else {
						Toast({message: res.err_msg || '未知错误', duration: 1000, position: 'bottom'});
					}
				})
			}
		}
	}
</script>

<style lang="scss" type="text/scss" scoped>
  .upload {
    /*padding-top: pxToRem(90);*/
    background: #fff;

  .header {
  @include border-1px("bottom", #eee);
  }
  .upload_box{
    @include border-1px("bottom", #eee);
  }
  .file_title{
    height: pxToRem(80);
    line-height: pxToRem(80);
    font-size: pxToRem(30);
    font-weight: bold;
    margin-left: pxToRem(30);
    @include border-1px("bottom", #eee);
  }
  .upload_submit {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: pxToRem(100);
    line-height: pxToRem(100);
    font-size: pxToRem(40);
    text-align: center;
    color: #fff;
  }

  .notice {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);

  &
  > div {
    background: #fff;
    border-radius: pxToRem(10);
    margin: 0 pxToRem(60);
    padding: pxToRem(20) pxToRem(20);
    border: 1px solid #eee;

  p {
    font-size: pxToRem(28);
    color: #333;

  &
  :first-child {
    text-align: center;
    font-size: pxToRem(32);
  }

  &
  :last-of-type {
    text-indent: pxToRem(56);
  }

  }
  div {
    width: pxToRem(200);
    margin: 0 auto;
    padding: pxToRem(10) 0;
    text-align: center;
    border-radius: pxToRem(10);
  }

  }
  }
  }
</style>

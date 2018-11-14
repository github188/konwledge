import NumberToChinese from 'assets/js/NumberToChinese'
import {hynbOrderInfo} from 'assets/js/api'
import {Toast,Indicator } from 'mint-ui';
import {invoiceConfirm} from './invoice'
import Invoice from 'views/components/Invoice'

export const hynbDetail = {
  components:{
    Invoice
  },
  mixins:[invoiceConfirm],
  data(){
    return{
      insPerson:'',
      insedPerson:'',
      orderId:this.$route.query.orderId,
      allPrice:'0',
      truckList:[]
    }
  },
  created(){
    Indicator.open({text: '页面加载中...', spinnerType: 'fading-circle'});
    hynbOrderInfo(this.orderId).then((res)=>{
      Indicator.close();
      if(res.err_code===0){
        this.insPerson = res.data.policyholder;
        this.insedPerson = res.data.beneficiary;
        this.truckList = res.data.hynb_truck;
        this.allPrice = res.data.price - res.data.discount;
        this.setData(res);
      }else{
        Toast({message:res.err_msg || '未知错误',position:'bottom'})
      }
    }).catch(()=>{Indicator.close();})
  },
  methods:{
    NumberToChinese(num){
      return NumberToChinese(num)
    }
  }
}

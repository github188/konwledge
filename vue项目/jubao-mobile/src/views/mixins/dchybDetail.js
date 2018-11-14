import { MessageBox, Indicator, Toast } from 'mint-ui';
import { provinceCity,showData } from './index'
import { countPrice } from "./dchyb"
import { cmnProductpriceList } from "../../assets/js/api"
import { productData } from "../../assets/js/common"

export const dchybDetail = {
  mixins:[provinceCity,countPrice,showData],
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.getProvinceList();
      Indicator.open({text: '加载中...', spinnerType: 'fading-circle'});
      cmnProductpriceList({product_name: productData[vm.productType]["name"]}).then(res=>{
        Indicator.close();
        if(res.err_code!==0){Indicator.close();Toast({message: res.err_msg || "未知错误", position: 'bottom'});return ;}
        if(res.rows.length===1){
          vm.setData(res.rows[0])
        }
      })
    })
  },
  methods:{
    setData(priceInfo){
      this.minPremium=priceInfo.min_premium;
      this.maxCoverage = priceInfo.max_coverage;
      this.rate= priceInfo.rate;
      this.priceId=priceInfo.id;
    },
  }

};

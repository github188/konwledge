import {zcbOrderPrice} from "../../assets/js/api";
import {provinceCity} from "./index"

export const zcbCountPrice ={
  data(){
    return {
      distance:"0",
      price:"0",
      coverage:1500000,
    }
  },
  methods:{
    countPrice(){
      if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
        this.distance = "0";this.price = "0" ;return ;
      }
      zcbOrderPrice({
        start_province: this.startProvince,
        start_city: this.startCity,
        end_province: this.endProvince,
        end_city: this.endCity,
        coverage: this.coverage * 1
      }).then((res) => {
        this.distance = res.data.distance;
        this.price = res.data.price ;
      })
    },
    switchRadio(value){
      if(value===1500000){
        this.coverage=1500000
      }else if(value===500000){
        this.coverage=500000
      }
      this.countPrice()
    }
  }
};

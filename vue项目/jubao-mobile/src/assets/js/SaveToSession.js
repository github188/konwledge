import {getLocationQuery} from "../../libs/js/LocationTransform";
import {getStorage, setStorage} from "../../libs/js/SessionStorage";
import {cmnAppServicedproductList} from "./api";

// 保存地址栏的所有参数
export const saveLocationInfo=()=>{
  let query = getLocationQuery(location.href); //获取?后面的信息
  if(!query){return}
  setStorage({ "locationQuery":Object.assign(getStorage("locationQuery") || {},query) });
};

//保存产品信息
export const saveProductList =()=>{
  if(getStorage("productList")){return ;}
  //app_id 聚保就传1 ； os_type: 8 为H5端
  cmnAppServicedproductList({app_id:1,os_type:8,}).then(res=>{
    setStorage({"productList":res});
  })
};

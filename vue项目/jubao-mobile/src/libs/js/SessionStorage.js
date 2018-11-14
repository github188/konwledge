/*
目前sessionStorage中的存储字段名有:
provinceList:["湖北省"，"北京市"]
* */
import {isObject} from "./Base";


//以对象的形式储存信息
export const setStorage = (L) =>{
  if(!isObject(L)){return ;}
  if(!window.sessionStorage){return ;}
  for(let key in L){
    window.sessionStorage.setItem(key,JSON.stringify(L[key]));
  }
};

//若不存在对应的value 则返回null
export const getStorage = (key) =>{
  if(!window.sessionStorage){return ;}
  return JSON.parse(window.sessionStorage.getItem(key));
};

export const removeStorage = (key) => {
  if(!window.sessionStorage){return ;}
  sessionStorage.removeItem(key)
};

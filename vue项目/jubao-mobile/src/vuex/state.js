/**
 * Created by pc-20170420 on 2017/5/4.
 */
import { initCompData,reg,apiUrl,xlsxModel } from "../assets/js/data";
import {getLocalStorage} from '../assets/js/store'

let router = getLocalStorage('router');

export const state = {
    ...apiUrl, //api请求的url地址
    ...xlsxModel, //各个xlsx模板
    ...reg,   //所有正则表达式
    ...initCompData,//所有组件的初始值

    routerFrom:router?router.from:'',//路由跳转时的from
    routerTo:router?router.to : '',  //路由跳转时的to
    backUrl:router?router.backUrl : '/', //路由跳转后返回的地址

    productInfo:"",
};

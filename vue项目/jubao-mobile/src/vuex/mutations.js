/**
 * Created by pc-20170420 on 2017/5/4.
 */
import {MessageBox,Indicator,Toast} from "mint-ui"
import {setLocalStorage} from 'assets/js/store'

export const mutations= {
    //读取cookie
    GETCOOKIE(state,params){
        let name=params;
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            state.token=unescape(arr[2]) ;
        }else {
            state.token=null ;
        }
    },
    //移除font-size
    REMOVEFS(state){
        let html = document.documentElement;
        html.style.fontSize = "";
    },
    /**
     * 以对象的形式传入； 会自动在sessionStorage中生成对应的属性名和值；附带sessionStorage为空时的判断
     */
    SETSTORAGE(state,message){ //{phbId:[]}  sessio保存，增加，修改 session
        let key ="jubao56";
        let jubaoStorage =  JSON.parse(window.sessionStorage.getItem(key));
        jubaoStorage=jubaoStorage==null?{}:jubaoStorage;
        for(let i in message){
            jubaoStorage[i]=message[i]
        }
        window.sessionStorage.setItem(key,JSON.stringify(jubaoStorage));
    },
    CATCHCASE(state,fn){
      Indicator.close();
      state.catchCount+=1;
      if(state.catchCount>=3){
        MessageBox.alert('检测到您的当前网络环境较差，请您切换到良好的网络环境下投保',"提示")
      }else{
        MessageBox.alert('网络错误 请重试',"提示").then(action => {
          fn();
        });
      }
    },
    SETROUTER(state,{to,from,backUrl}){
      state.routerFrom = from;
      state.routerTo = to;
      state.backUrl = backUrl;
      let toData = {
        path:to.path,
        fullPath:to.fullPath,
        query:to.query,
        params:to.params,
      };
      let fromData = {
        path:from.path,
        fullPath:from.fullPath,
        query:from.query,
        params:from.params,
      };
      setLocalStorage('router',{to:toData,from:fromData,backUrl})
    }
};

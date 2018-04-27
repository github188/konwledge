/**
 * Created by pc-20170420 on 2017/5/4.
 */

export const mutations= {
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

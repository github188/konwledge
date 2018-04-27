/**
 * Created by pc-20170420 on 2017/5/4.
 */
// export const incrementCounter = function ({ dispatch, state }) {
//     dispatch('INCREMENT', 1)
// };
export const actions = {
    //写法1
    test({commit},count){
        commit('SET_APP',count) //在mutation中有对应的'SET_APP'即可
    },
    add(store,param){
        return new Promise(function(resolve, reject) {
                store.commit('ADD',param);
                resolve("ok");
        })
    },
    catchCase({commit},fn){
      commit("CATCHCASE",fn)
    }
};

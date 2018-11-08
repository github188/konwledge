/**
 * Created by pc-20170420 on 2017/5/4.
 */
// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

// export function getCount (state) {
//     return state.count
// }
export const getters = {
    dataList:(state)=>state.dataList
};
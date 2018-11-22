/**
 * 深拷贝对象或者数组
 * @param obj   对象或数组
 * @returns {*} 返回一个同样的对象/数组，但是与原对象/数组没有关联
 */
export const deepCopy = (obj) => {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                // 判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepCopy(obj[key])
                } else {
                    // 如果不是，简单复制
                    objClone[key] = obj[key]
                }
            }
        }
    }
    return objClone
}
export const importScript = (src) => {
    // 根据src来检测目标script标签是否已存在
    function checkScriptExist (src) {
        let flag = false
        let scriptList = document.getElementsByTagName('script')
        for(let i=0;i<scriptList.length;i++){
          if (scriptList[i].src==='src') {
            flag = true ;break
          }
        }
        return flag
    }

    // 若script标签已存在，则放弃继续引入
    if (checkScriptExist(src)) {
        return ;
    }
    let html = document.querySelector('html')
    let script = document.createElement('script')
    script.src = src
    html.appendChild(script)
}
export const flashChecker = () => {
  let flag = false
  if (window.ActiveXObject) {
    try {
      let swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
      if (swf) {
        flag = true
      }
    } catch (e) {
    }
  } else {
    try {
      let swf = navigator.plugins['Shockwave Flash']
      if (swf) {
        flag = true
      }
    } catch (e) {
    }
  }
  if (flag) {
    console.log('flash ok')
  } else {
    console.log('flash error')
  }
  return flag
}

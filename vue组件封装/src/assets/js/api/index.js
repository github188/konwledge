import axios from '../axios'

class Service {
  constructor () {
    var url = window.location.href
    url = url.substr(url.indexOf('//') + 2)
    url = url.substr(url.indexOf('/') + 1)
    url = url.substr(0, url.indexOf('/'))
    this.urlLoaction = 'http://' + window.location.host + '/' + url + '/'
    this.urlLoaction = 'http://192.168.2.41:8081'
  }
  ctxPath () {
    return this.urlLoaction
  }
  agsAPI () {
    return this.urlLoaction.substr(this.urlLoaction.indexOf('//') + 2) + './plugin/arcgis_js_api/dojo'
  }
}

let ctxPath = new Service().ctxPath()
let testPath = 'http://' + (location.host === 'localhost:8088' ? 'localhost:3000' : location.host)
// let agsAPI = new Service().agsAPI()

// export const comUserInfo = axios('url', {})
let api = {
  setLanguage (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setlanguagetype'}, param), 'post') },
  getLanguage (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getlanguagetype'}, param), 'post') },
  cmnUserLogin (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'login'}, param), 'post') },
  // cmnUserInfo (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getbaseinfo'}, param), 'post') },
  getNetwork (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getnetwork'}, param), 'post') },
  setNetwork (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setnetwork'}, param), 'post') },
  getFtp (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getftp'}, param), 'post') },
  setFtp (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setftp'}, param), 'post') },
  getChnParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getchnparam'}, param), 'post') },
  addChnParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setchnparam', option: 'add'}, param), 'post') },
  updateChnParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setchnparam', option: 'update'}, param), 'post') },
  delChnParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setchnparam', option: 'del'}, param), 'post') },
  getRoi (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getroi'}, param), 'post') },
  roiVideoGet (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'roiVideoGet'}, param), 'post') },
  setRoi (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setroi'}, param), 'post') },
  getUserParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getuserparam'}, param), 'post') },
  addUserParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setuserparam', option: 'add'}, param), 'post') },
  updateUserParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setuserparam', option: 'update'}, param), 'post') },
  deleteUserParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setuserparam', option: 'del'}, param), 'post') },
  rebootProcess (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'rebootprocess'}, param), 'post') },
  rebootDev (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'rebootdev'}, param), 'post') },
  recovery (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'recovery'}, param), 'post') },
  setTime (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'settime'}, param), 'post') },
  homeControl (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'homeControl'}, param), 'post') },
  homeControlSet (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'homeControlSet'}, param), 'post') },
  getDevInfoFile (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getdevinfofile'}, param), 'post') },
  authorizeUpdate (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'authorizeUpdate'}, param), 'post') },
  getSystemParam (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getsystemparam'}, param), 'post') },
  systemLevelUpdate (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'systemLevelUpdate'}, param), 'post') },
  getAutoReboot (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getautoreboot'}, param), 'post') },
  autoServiceSet (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'autoServiceSet'}, param), 'post') },
  recordDataSearch (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'recordDataSearch'}, param), 'post') },
  recordEquirementList (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'recordEquirementList'}, param), 'post') },
  channelData (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'channelData'}, param), 'post') },
  getTime (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'gettime'}, param), 'post') },
  setVideoChn (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'setvideochn'}, param), 'post') },
  getVideoList (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'getvideolist'}, param), 'post') },
  delVideo (param) { return axios(testPath + '/v2/userlogic', Object.assign({method: 'delvideo'}, param), 'post') }
}
export const _userlogic = (param) => axios(ctxPath + '/business/userlogic.php', param)  // eslint-disable-line

export default api

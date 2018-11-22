module.exports = {
  language: '语言',
  chinese: '中文',
  dropdown: '下拉菜单',
  element: {
    emptyText: '暂无数据'
  },
  reg: {
    username: '用户名格式不正确，（4到16位，由字母，数字，下划线，减号组成）',
    password: '密码格式不正确，（请输入4到16位，由字母，数字，下划线，减号组成）'
  },
  dialog: {
    confirm: '确定',
    cancel: '取消'
  },
  socket: {
    tipsTitle: '提示',
    error: '连接异常',
    confirm: '确定'
  },
  confirm: {
    title: '提示',
    confirm: '确认',
    cancel: '取消'
  },
  login: {
    title: '嵌入式视频结构化分析器',
    tips: '推荐使用谷歌浏览器Google Chrome',
    formTitle: '用户登陆',
    usernameHolder: '请输入用户名',
    passwordHolder: '请输入密码',
    passwordRemember: '记住密码',
    loginBtn: '登        录',
    copyright: 'Copyright  北京深瞐科技有限公司  版权所有'
  },
  home: {
    title: '嵌入式视频结构化分析器'
  },
  vHeader: {
    about: '关于',
    currentTask: '实时任务',
    systemSetting: '系统设置',
    confirmTips: '确定要退出吗？',
    version: '系统版本',
    exit: '退出登录'
  },
  currentTask: {
    videoTitle: '实时监控',
    channelTitle: '选择通道',
    chaTips: '通道名获取中',
    chaSucTips: '切换成功',
    carTitle: '车辆识别',
    faceTitle: '人脸识别',
    passerbyTitle: '行人识别',
    oneLevelCar: '机动车',
    oneLevelface: '行人',
    oneLevelPasserby: '非机动车',
    chart: {
      title: '当日识别数据',
      passerby: '行人',
      car: '轿车',
      minibus: '面包车',
      truck: '卡车',
      bus: '客车',
      motorbike: '摩托车',
      tricycle: '三轮车',
      bike: '自行车'
    }
  },
  menu: {
    net: {
      name: '网络设置',
      ip: 'IP设置',
      ftp: 'FTP设置'
    },
    passageway: {
      name: '通道设置',
      passageway: '通道设置',
      roi: 'ROI区域设置'
    },
    sysSetting: {
      name: '系统维护',
      device: '设备操作',
      checkTime: '设备校时',
      homeControl: '首页显示',
      authorize: '授权管理',
      levelUp: '系统升级',
      autoService: '自动维护',
      dataUpload: '数据上传'
    }
  },
  ip: {
    wanTitle1: '网口1设置',
    wanTitle2: '网口2设置',
    devname: '设备名称',
    ipv6: 'IPv6地址',
    model: '设备型号',
    v6mask: 'IPv6子网掩码',
    ipv4: 'IPv4地址',
    v4mask: 'IPv4子网掩码',
    mac: 'MAC地址',
    v4gateway: 'IPv4网关',
    mtu: 'MTU',
    dns: 'DNS',
    testBtn: '测试',
    saveBtn: '保存',
    switchTips: '信息还未保存，确定离开?'
  },
  ftp: {
    ftpUse: '启用FTP',
    pip: '服务器地址',
    port: '端口',
    username: '账号',
    password: '密码',
    url: 'FTP路径',
    httpUse: '启用HTTP',
    saveBtn: '保存'
  },
  passageway: {
    id: '通道号',
    chnname: '设备名称',
    chnip: '设备IP',
    chnport: '设备端口',
    netstatus: '网络状态',
    online: '在线',
    offline: '离线',
    chnstatus: '设备状态',
    normal: '正常',
    unusual: '异常',
    proto: '协议类型',
    rtspurl: 'RTSP地址源',
    control: '操作',
    editor: '编辑',
    dialogConfirm: '保存',
    dProto: '协议：',
    dSelectHolder: '请选择协议',
    chnnameHolder: '请输入设备名称',
    dRtspHolder: '请输入rtsp地址源',
    dIpHolder: '请输入设备IP',
    dPort: '端口',
    dPortHolder: '请输入端口号',
    bitstream: '码流',
    bitstreamHolder: '请选择码流',
    maliu1: '码流一',
    maliu2: '码流二',
    username: '用户名',
    usernameHolder: '请输入用户名',
    password: '密码',
    passwordHolder: '请输入密码',
    addChn: '添加通道',
    editorChn: '修改通道',
    chooseChn: '请选择通道',
    delConfirmBf: '是否删除设备',
    delConfirmAf: '的相关配置'
  },
  roi: {
    chnlabel: '通道选择',
    holder: '请选择',
    roiBoxTips: '识别目标大小',
    minSize: '识别目标最小尺寸',
    drawSec: '绘制区域',
    clearDraw: '清除绘制',
    save: '保存',
    default: '默认',
    custom: '自定义',
    checkChn: '请选择通道',
    checkPt: '请选择绘制区域',
    checkSize: '请选择最小尺寸'
  },
  device: {
    resetSoft: '重启程序',
    resetDev: '重启设备',
    initSetting: '恢复出厂设置'
  },
  checkTime: {
    autoCheck: '自动校时',
    ip: '服务器ip',
    inter: '时间间隔（分钟）',
    handleCheck: '手动校时',
    timeHolder: '选择日期时间',
    devTime: '设备时间',
    getDevTime: '取设备时间',
    getSystemTime: '同步系统时间',
    handleTips: '说明: 手动校验设备时间操作，可能损坏设备授权时间，造成设备故障。请谨慎使用。',
    save: '保存'
  },
  homeControl: {
    title: '首页显示设置',
    face: '显示人脸识别模块',
    car: '显示车辆识别模块',
    passerby: '显示行人识别模块',
    upload: '保存'
  },
  authorize: {
    loadOutLabel: '导出授权文件',
    loadOut: '导出文件',
    uploadLabel: '上传授权文件',
    lib: '浏览',
    upload: '上传'
  },
  levelUp: {
    status: '当前状态',
    datanum: '获取数据数量',
    space: '存储空间',
    runtime: '设备运行时间',
    proversion: '硬件版本号',
    devversion: '软件版本号',
    algversion: '算法版本号',
    devguid: '设备GUID',
    uploadFile: '上传升级文件',
    lib: '浏览',
    up: '升级'
  },
  autoService: {
    autoLabel: '自动重启系统',
    timePickerHolder: '任意时间点',
    save: '保存',
    everyday: '每天'
  },
  dataUpload: {
    used: '已使用',
    available: '还剩余',
    uploadTxt: '点击上传',
    name: '文件名',
    size: '文件大小',
    url: '文件地址',
    control: '操作',
    del: '删除',
    confirmTips: '此操作将删除该视频, 是否继续?',
    delConTips: '确定移除'
  },
  user: {
    dialogConfirm: '保存'
  },
  content: {
    main: 'this is content'
  }
}

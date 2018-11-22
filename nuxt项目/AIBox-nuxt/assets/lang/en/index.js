module.exports = {
  language: 'Language',
  chinese: 'Chinese',
  dropdown: 'dropdown',
  element: {
    emptyText: 'No data'
  },
  reg: {
    username: 'The format of user name is incorrect, (4 to 16 bits, consisting of letters, numbers, underscores, minus signs)',
    password: 'The password format is incorrect. (please input 4 to 16 bits, alphabetic, numeric, underline, minus sign)'
  },
  dialog: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  socket: {
    tipsTitle: 'Notice',
    error: 'Error',
    confirm: 'Confirm'
  },
  confirm: {
    title: 'Notice',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  login: {
    title: 'Embedded Video Structured Analyzer',
    tips: 'Place use Chrome browser ',
    formTitle: 'User',
    usernameHolder: 'Enter your username',
    passwordHolder: 'Enter your password',
    passwordRemember: 'Remember password',
    loginBtn: 'Login',
    copyright: 'Beijing SEEMMO Technology Ltd all right reserved'
  },
  home: {
    title: 'Embedded Video Structured Analyzer'
  },
  vHeader: {
    about: 'About',
    currentTask: 'Real-time Task ',
    systemSetting: 'System Setup',
    confirmTips: 'Are you sure you want to quit?',
    version: 'System Version',
    exit: 'exit'
  },
  currentTask: {
    videoTitle: 'Real Time Monitoring',
    channelTitle: 'Select channel',
    chaTips: 'Getting Channels ',
    chaSucTips: 'Switch successful',
    carTitle: 'Vehicle',
    faceTitle: 'Face',
    passerbyTitle: 'Pedestrian',
    oneLevelCar: 'Motor Vehicle',
    oneLevelface: 'Pedestrian',
    oneLevelPasserby: 'Non-Motor Vehicle',
    chart: {
      title: 'Data Statistics',
      passerby: 'Pedestrian',
      car: 'Car',
      minibus: 'Van',
      truck: 'Truck',
      bus: 'Bus',
      motorbike: 'Motorcycle',
      tricycle: 'Tricycle',
      bike: 'Bicycle'
    }
  },
  menu: {
    net: {
      name: 'Network Setup',
      ip: 'IP Setup',
      ftp: 'FTP Setup'
    },
    passageway: {
      name: 'Channels Setup',
      passageway: 'Channels Setup',
      roi: 'ROI Setup'
    },
    sysSetting: {
      name: 'Maintenance',
      device: 'System',
      checkTime: 'Device timing',
      homeControl: 'Home setup',
      authorize: 'Authorization management',
      levelUp: 'System Update',
      autoService: 'Auto-maintenance',
      dataUpload: 'Data upload'
    }
  },
  ip: {
    wanTitle1: 'Ethernet1 Setup',
    wanTitle2: 'Ethernet2 Setup',
    devname: 'Device Name',
    ipv6: 'IPv6',
    model: 'Device Model',
    v6mask: 'IPv6 subnet mask',
    ipv4: 'IPv4',
    v4mask: 'IPv4 subnet mask',
    mac: 'MAC',
    v4gateway: 'IPv4 gateway',
    mtu: 'MTU',
    dns: 'DNS',
    testBtn: 'Testing',
    saveBtn: 'Save',
    switchTips: 'Data not saved ?'
  },
  ftp: {
    ftpUse: 'FTP enabled',
    pip: 'Server address',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    url: 'FTP Path',
    httpUse: 'Http enabled',
    saveBtn: 'Save'
  },
  passageway: {
    id: 'Channel No',
    chnname: 'Device Name',
    chnip: 'IP',
    chnport: 'Port',
    netstatus: 'Network Status',
    online: 'Online',
    offline: 'Offline',
    chnstatus: 'Device Status',
    normal: 'Normal',
    unusual: 'Error',
    proto: 'Protocol',
    rtspurl: 'RTSP Source',
    control: 'Editor',
    editor: 'Editor',
    dialogConfirm: 'Save',
    dProto: 'Protocol：',
    dSelectHolder: 'Place Enter Protocol：',
    chnnameHolder: 'Place Enter Device Name',
    dRtspHolder: 'Place Enter RTSP Source',
    dIpHolder: 'Place Enter IP',
    dPort: 'Port',
    dPortHolder: 'Place Enter Port',
    bitstream: 'bitstream',
    bitstreamHolder: 'Place select Port',
    maliu1: 'bitstream1',
    maliu2: 'bitstream2',
    username: 'Username',
    usernameHolder: 'Place Enter Username',
    password: 'Password',
    passwordHolder: 'Place Enter Password',
    addChn: 'Add Channel',
    editorChn: 'Reset Channel',
    chooseChn: 'Select Channel',
    delConfirmBf: 'Delete device configuration',
    delConfirmAf: 'configuration'
  },
  roi: {
    chnlabel: 'Channel Select',
    holder: 'Please choose',
    roiBoxTips: 'Object Size',
    minSize: 'Target minimum size',
    drawSec: 'Drawing area',
    clearDraw: 'Clear ',
    save: 'Save',
    default: 'Default',
    custom: 'User-defined',
    checkChn: 'Pleace Select Channel',
    checkPt: 'Pleace Drawing area',
    checkSize: 'Place select minimum size'
  },
  device: {
    resetSoft: 'Reboot Procedure',
    resetDev: 'Reboot Device',
    initSetting: 'Factory reset'
  },
  checkTime: {
    autoCheck: 'Auto-Timing',
    ip: 'Server IP',
    inter: 'Time interval (Minute)',
    handleCheck: 'Manual',
    timeHolder: 'Select date',
    devTime: 'Device Time',
    getDevTime: 'Get Device Time',
    getSystemTime: 'System clock synchronizing',
    handleTips: 'Remark：Manually verifying the device time operation may damage the device authorization time and cause device failure.Place carefully use',
    save: 'Save'
  },
  homeControl: {
    title: 'Home page Setup',
    face: 'Face Recognition Module',
    car: 'Vehicle Recognition Module',
    passerby: 'Pedestrian Recognition Module',
    upload: 'Upload'
  },
  authorize: {
    loadOutLabel: 'Export authorization  file',
    loadOut: 'Export file',
    uploadLabel: 'Upload authorization file',
    lib: 'Browse',
    upload: 'Save'
  },
  levelUp: {
    status: 'Status',
    datanum: 'Data',
    space: 'Storage Spaces',
    runtime: 'Running time',
    proversion: 'Hardware version',
    devversion: 'Software version',
    algversion: 'Algorithm version',
    devguid: 'GUID',
    uploadFile: 'Upload',
    lib: 'Browse',
    up: 'Upgrade'
  },
  autoService: {
    autoLabel: 'Reboot system',
    timePickerHolder: 'Any time ',
    save: 'Upgrade',
    everyday: 'Per day'
  },
  dataUpload: {
    used: 'Used',
    available: 'Remain',
    uploadTxt: 'Upload',
    name: 'File name',
    size: 'File size',
    url: 'File url',
    control: 'Editor',
    del: 'delete',
    confirmTips: 'This opertion will delete video  ok?',
    delConTips: 'Remove '
  },
  user: {
    dialogConfirm: 'Save'
  },
  content: {
    main: 'this is content'
  }
}

export default {
  username: /^[a-zA-Z0-9_-]{4,16}$/, // 4到16位（字母，数字，下划线，减号）
  password: /^[a-zA-Z0-9_-]{4,16}$/, // 4到16位（字母，数字，下划线，减号）
  IPv4: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/, // IPv4正则
  v4Mask: /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/, // 子网掩码正则
  v4Getway: /^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/, // IPv4网关正则
  dns: /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)?$/ // eslint-disable-line
}

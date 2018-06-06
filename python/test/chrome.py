# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

# 目前支持的driver有Firefox, Chrome, IE和Remote等
driver = webdriver.Firefox(executable_path="./geckodriver")
# 直到页面被加载完（onload事件被触发）才将控制权返回脚本
driver.get('https://www.baidu.com')
assert u'百度一下，你就知道' in driver.title
print u"当前URL：", driver.current_url
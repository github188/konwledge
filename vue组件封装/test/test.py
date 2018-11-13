# -*- coding: utf-8 -*-
import time
import re
from selenium import webdriver

# 目前支持的driver有 Firefox, Chrome, IE和Remote等
driver = webdriver.Chrome()
# 直到页面被加载完（onload事件被触发）才将控制权返回脚本
# 'http://192.168.201.123'
driver.set_window_size(1740,900)
driver.get('http://localhost:8088/#/login')
time.sleep(1)
print (driver.get_window_size())

# 登录页
time.sleep( 1 )
driver.find_element_by_css_selector("input[placeholder=请输入用户名]").send_keys("admin")
driver.find_element_by_css_selector("input[placeholder=请输入密码]").send_keys("123456")
driver.find_element_by_xpath("//p[@class='remember-box']/label/span[2]").click()
time.sleep( 1 )
driver.find_element_by_css_selector(".login-box>button").click()
time.sleep( 2 )

# 实时任务页 ---- 无法测试
# driver.find_element_by_css_selector(".player-image-box").click()
# confirm = driver.switch_to.alert
# confirm.accept()
time.sleep( 2 )

# 切换到系统设置 , 默认进入IP设置页
driver.find_element_by_css_selector(".v-header-page>.product-list>li:nth-of-type(2)").click()
time.sleep( 2 )

# IP设置页 --- 两个网口的保存功能
driver.find_element_by_css_selector(".btn-wrapper>button:nth-of-type(2)").click()
time.sleep( 2 )
driver.find_element_by_css_selector("#tab-second").click()
time.sleep( 2 )
driver.find_element_by_css_selector(".btn-wrapper>button:nth-of-type(2)").click()
time.sleep( 2 )

# FTP设置页     保存功能
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(1)>ul>li:nth-of-type(2)").click()
time.sleep( 2 )
driver.find_element_by_css_selector(".save-box>button").click()
time.sleep( 2 )

# 通道设置---- 通道设置    刷新，编辑功能
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(2)>.el-submenu__title").click()
time.sleep( 2 )
driver.find_element_by_xpath("//div[@class='content passageway-page']/div/p/span/i").click()
time.sleep( 3 )
# !编辑无法测试-----编辑按钮找不到，一直提示"element not visible"
# driver.find_element_by_css_selector(".el-table__fixed-right>.el-table__fixed-body-wrapper>table>tbody>tr:nth-of-type(2)>td:last-child>").click()
driver.find_element_by_xpath("//div[@class='el-table__fixed-right']/div[2]/table/tbody/tr[2]/td[9]/div/button").click()
time.sleep( 1 )
driver.find_element_by_xpath("//div[@class='footer']/button[2]").click()
time.sleep( 3 )

# ROI区域设置 --- 保存
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(2)>ul>li:nth-of-type(2)").click()
time.sleep( 2 )
driver.find_element_by_css_selector(".device-chose>.el-select").click()
time.sleep( 0.5 )
driver.find_element_by_xpath("//body/div[2]/div/div/ul/li[2]").click()
time.sleep( 2 )
driver.find_element_by_css_selector(".target-size-box>.save-box>button").click()
time.sleep( 2 )

# 系统维护
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>.el-submenu__title").click()
time.sleep( 2 )

# 设备校时
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(2)").click()
time.sleep( 2 )
driver.find_element_by_xpath("//div[@class='auto-checked-box checked-box']/p/label").click()
time.sleep( 0.5 )
driver.find_element_by_xpath("//p[@class='save-box']/button").click()
time.sleep( 2 )
driver.find_element_by_xpath("//div[@class='hand-checked-box checked-box']/p/label").click()
time.sleep( 0.5 )
driver.find_element_by_xpath("//p[@class='auto-checked-system']/button").click()
time.sleep( 0.5 )
driver.find_element_by_xpath("//p[@class='save-box']/button").click()
time.sleep( 2 )

# 首页显示
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(3)").click()
time.sleep( 2 )
driver.find_element_by_xpath("//p[@class='save-box']/button").click()
time.sleep( 2 )
# 授权管理
# driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(4)").click()
# 系统升级
# driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(5)").click()
# 自动维护
driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(6)").click()
time.sleep( 2 )
driver.find_element_by_xpath("//p[@class='save-box']/button").click()
time.sleep( 2 )
# 数据上传
# driver.find_element_by_css_selector(".el-menu>li:nth-of-type(3)>ul>li:nth-of-type(7)").click()

# 退出
driver.find_element_by_xpath("//div[@class='v-header-page header']/div[3]/div[2]").click()
time.sleep( 1 )
driver.find_element_by_xpath("//div[@class='el-message-box']/div[3]/button").click()
time.sleep( 1 )

# 关闭
time.sleep( 2 )
driver.quit()

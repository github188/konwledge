第一种：JS给OC传值。
===================
1. 技术方案：使用JavaScriptCore.framework框架
2. 使用场景： 网页中代码中的某个方法，比如点击事件方法，将该方法的参数传值给OC，供OC使用。
比如：携程APP中一个热门景点的网页中，有很多个热门景点，点击某个景点的图片或名称，可以跳转到原生中的该景点详情页控制器。
3. 代码实现如下：
OC里要实现的代码：
拖入JavaScriptCore.framework静态库，遵守UIWebViewDelegate代理协议。 
在-webViewDidFinishLoad:方法里编写如下代码：


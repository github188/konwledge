日期时间格式与字符串格式之间的相互转化
====
引入的插件为一个函数，包含两个参数。

    import format from 'date-string-transform'
    /**
     * 功能：（日期时间形式）与（字符串时间形式）之间的相互转化；
     * @param time   [Date,String]
     *      time参数为字符串时，时间书写顺序必须为 年,月,日,时,分,秒
     *      示例：new Date(); 2018年10月20日 16时35分28秒； 2018:10:20 16:35:28；
     * @param typeString  [String]
     *      yyyy代表年份; MM代表月份; dd代表天数; hh代表小时; mm代表分钟; ss代表秒数; 
     * @return  [Date,String]
     */
    format(time, typeString)    
    

PS:
*   typeString中，时间数字的连接符(`年`,`-`,`:`等)没有任何要求    
     暂时没有涉及到毫秒数，所有的毫秒数默认为0  
     
     
1,日期时间格式转化为指定字符串形式
----      
* 字符串规则为：   
yyyy代表年，MM代表月，dd代表日，hh代表时，mm代表分，ss代表秒     
其中除了MM代表月，mm代表分，其他地方大小写皆可。

使用示例：
        
      import format from 'date-string-transform'
      
      format(new Date(),'yyyy年MM月dd日 hh时mm分ss秒')    //2018年07月31日 11时03分34秒
      format(new Date(),'yyyy-MM-dd hh-mm-ss')      //2018-07-31 11-03-34
      format(new Date(),'hh:mm:ss  yyyy年MM月dd日')    //11:03:34  2018年07月31日

注意： format的第二个参数 typeString 为必传参数，需要指定以什么形式输出。


2,指定字符串格式转化为日期时间格式
----

      import format from 'date-string-transform'
      
      format(2018年07月31号 09点58分16秒)
      format(2018-07-31 09:58:16)

注意： 字符串typeString，时间顺序必须为：年,月,日,时,分,秒，且*代表时间的数字必须为两位数*。




<?php	
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");
	error_reporting(E_ALL ^ E_DEPRECATED);


	$var_conn = mysql_connect('bdm25916650.my3w.com','bdm25916650','12345678');//1,利用用户名和密码链接到指定的 主机中
	mysql_select_db('bdm25916650_db',$var_conn);//2,找到该主机下面指定的数据库
	$var_sql = "select * from `1608` ";//3,建立需要执行的sql
	$var_result = mysql_query($var_sql);//4,执行语句，[返回的数据结果是一个资源]
	$rst = array();
	while($row = mysql_fetch_row($var_result)){//5,解析返回的资源，重新放入一个集合中
		$rst[]=$row;
	}
	echo json_encode($rst);//6,将指定的集合转成JSON格式输出

    // 释放资源
   // mysql_free_result($var_result);
    // 关闭连接
    //mysql_close($var_conn);  
?>
<?php	
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");
	error_reporting(E_ALL ^ E_DEPRECATED);
	
	
	
	$var_conn = mysql_connect('bdm25916650.my3w.com','bdm25916650','12345678');//1,利用用户名和密码链接到指定的 主机中
	mysql_select_db('bdm25916650_db',$var_conn);//2,找到该主机下面指定的数据库
	
	//$var_conn = mysql_connect('localhost','root','root');//1,利用用户名和密码链接到指定的 主机中
	//mysql_select_db('day_12.20',$var_conn);//2,找到该主机下面指定的数据库
	
	$var_pwd = $_GET["pwd"];
	$var_username = $_GET["username"];
	
	//$var_pwd = "1111";
	//$var_username = "aaaa";	
	
	$var_sql = "select pwd from `1608` where username='$var_username' ";
	$query_result = mysql_query($var_sql);
	$result = mysql_fetch_row($query_result);//因为用户名是唯一的，所以查询的结果就只有一条。
	$db_pwd = $result[0];//result是一个集合
	
	
	if($db_pwd){
		echo 2;
	}else{
		//以这种方式可以获取传输过来的?pwd="+pwdInput.value+"&username="+userInput.value+"&id="+id;进行接收
		$var_sql = "INSERT INTO `1608`(username,pwd) VALUES ('$var_username','$var_pwd')"; //3,声明需要执行的sql语句  
		//注意： "" 这里一定要用""，用''就会爆炸！！！！！！
		
		//类似于原来的  $var_sql = "select * from `1608` ";
		$var_result = mysql_query($var_sql);//4,执行语句，[返回的数据结果是一个资源]
	
		$count= mysql_affected_rows(); //count表示受影响的行数
	
		if ($count) {  //1表示修改成功   0 表示修改失败
		   echo 1;
		}else{
		   echo 0;
		}
	}
		

	
	
?>
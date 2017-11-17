<?php
	@header("content-type=text/html;charset=utf-8");
	@header("Access-Control-Allow-Origin: *");
	error_reporting(E_ALL ^ E_DEPRECATED);
	
	
	$var_conn = mysql_connect('bdm25916650.my3w.com','bdm25916650','12345678');//1,利用用户名和密码链接到指定的 主机中
	mysql_select_db('bdm25916650_db',$var_conn);//2,找到该主机下面指定的数据库
	
	//$var_connect = mysql_connect("localhost","root","root");
	//mysql_select_db("day_12.20",$var_connect);
	
	$var_username = $_GET["username"];
	$var_pwd = $_GET["pwd"];
	
	//$var_username = 'cccc';
	//$var_pwd = '3333';
	
	$var_sql = "select pwd from `1608` where username='$var_username' ";
	$query_result = mysql_query($var_sql);
	$result = mysql_fetch_row($query_result);//因为用户名是唯一的，所以查询的结果就只有一条。
	//得到的result是一个集合
	
	//@db_count = count($result)
	//echo $db_count;
	$db_pwd = $result[0];//result是一个集合
	if($db_pwd){
		if($db_pwd == $var_pwd){
			echo "2";
		}else{echo "1" ;}
	}else{echo "0" ;}
?>
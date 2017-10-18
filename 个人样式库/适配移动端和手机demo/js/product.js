// JavaScript Document

var scrollTop=0;
  $(function(){
    
/*    $(".down-item img,.down-item .trdsp").on("mouseover",function(){
	$(".down-item .dsption").hide();
      $(this).parent().find(".dsption").show(300);
  }); 
    $(".down-item .dsption").delegate("mouseleave",function(){
      $(this).hide(300);
	  $(".down-item .dsption").hide(300);
  });  
  */
  
   $(".accessory-item").delegate(".trdsp,img","mouseover",function(){
    

     // $(".pro-accessory-box .dsption").hide(); 
      $(this).parents(".accessory-item").find(".dsption").show();
       //$(this).parents(".accessory-item").siblings().find(".dsption").hide().end().show();
  }); 
    $(".pro-accessory-box").delegate(".dsption","mouseout",function(){
    
	  $(".accessory-item .dsption").fadeOut();
  });
   
    var isScroll=false;
	
   $(".pro-accessory-box").delegate("a","click",function(){
      var aId=$(this).attr("aid");	  
	  $.get("accessoryParms.asp?aId="+aId,function(data){	
	     if(data && data!="")
		 {
			if(data.length>8){
			   isScroll=true;
			   $("#accessory-parms").html(data);
				  $("#accessory-parms").css({"top":$(window).height()/2,"margin-left":-($("#accessory-parms").width()/2),"margin-top":scrollTop-($("#accessory-parms").height()/2)});
				  isScroll=false;
				  $("#accessory-showBox").fadeIn();
				 $("#accessory-parms").fadeIn();
			 } 
			 else{
			 window.location=webroot+"product/product.asp?pid="+data+"&itemType="+itemType+"&cid="+cid;			 
		    }
		 }
		
	  })
	  
	 
   })
   
   $(".close-accessory-pop-btn").delegate("a","click",function(){
	  $("#accessory-showBox").hide();
	  $("#accessory-parms").hide();	
			
	})

  
   InitAccessoryParmsH();
   
   $(window).resize(function(){
     InitAccessoryParmsH();   
   })
   
   $(window).bind("scroll", function () {
      scrollTop=$(this).scrollTop();
      $("#accessory-showBox").css("top",scrollTop);	  
	  if(!isScroll)
	    $("#accessory-parms").css({"top":$(window).height()/2,"margin-left":-($("#accessory-parms").width()/2),"margin-top":scrollTop-($("#accessory-parms").height()/2)});
	 // console.log(scrollTop);
   })
   
  
  });
  
  function InitAccessoryParmsH()
  {
     $("#accessory-showBox").height($(window).height());
  }
  
  
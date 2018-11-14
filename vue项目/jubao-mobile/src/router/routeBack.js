import {getToken} from '../assets/js/api'

export const routeBack =(to,from)=> {
  //路由变化 backUrl
  let backUrl = '/';

  //结构介绍
  /*
  * to:当前页面路由
  * defaultBack:该页面默认返回路由
  * from:上一个页面的情况
  *       case:上一个页面的路由数组，back来自这些页面时对应的返回路由    多对一关系
  * */
  let routePathArr = [
    //zcb
    { to:'/zcb', defaultBack:'/' },
    { to:'/zcbCreate',defaultBack:'/dashboard',
      from:[
        {case:['/zcb'], back:'/zcb'},
        {case:['/zcbOrders','/home'], back:from.fullPath},
      ]
    },
    { to:'/zcbConfirm', defaultBack:{path:'/zcbCreate',query:to.query},
      from:[
        {case:['/zcbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/zcbOrders', defaultBack:'/dashboard',
      from:[
        {case:['/home'], back:'/'},
      ]
    },
    //ygb
    { to:'/ygb', defaultBack:'/' },
    { to:'/ygbCreate',defaultBack:'/dashboard',
      from:[
        {case:['/ygb'], back:'/ygb'},
        {case:['/ygbOrders','/home'], back:from.fullPath},
      ]
    },
    { to:'/ygbConfirm', defaultBack:{path:'/ygbCreate',query:to.query} },
    { to:'/ygbOrders', defaultBack:'/dashboard',
      from:[
        {case:['/home'], back:'/'},
      ]
    },
    { to:'/ygbAdd', defaultBack:'/ygbOrders?type=paid' },
    { to:'/ygbChange', defaultBack:'/ygbOrders?type=paid' },
    { to:'/ygbOrderDetails', defaultBack:'/ygbOrders?type=paid' },
    { to:'/ygbDetails', defaultBack:'/ygbOrders?type=unpaid' },
    { to:'/ygbClause',defaultBack:from.fullPath },

    //spb
    { to:'/spb', defaultBack:'/' },
    { to:'/spbCreate', defaultBack:'/dashboard',
      from:[
        {case:['/home','/spb','/spbOrders'],back:from.fullPath},
      ]
    },
    { to:'/spbConfirm',defaultBack:{path:'/spbCreate',query:to.query} },
    { to:'/spbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
    { to:'/spbOrderDetails',defaultBack:from.fullPath },
    { to:'/spbClause',defaultBack:from.fullPath },

    //llb
    { to:'/llb', defaultBack:'/' },
    { to:'/llbCreate', defaultBack:'/dashboard',
      from:[
        {case:['/llb','/home'],back:from.fullPath},
      ]
    },
    { to:'/llbConfirm',defaultBack:{path:'/llbCreate',query:to.query},
      from:[
        {case:['/llbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/llbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
    //hwb
    { to:'/hwb', defaultBack:'/' },
    { to:'/hwbCreate', defaultBack:'/dashboard',
      from:[
        {case:['/hwb','/home'],back:from.fullPath},
      ]
    },
    { to:'/hwbConfirm',defaultBack:{path:'/hwbCreate',query:to.query},
      from:[
        {case:['/hwbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/hwbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
    //phb
    { to:'/phb', defaultBack:'/' },
    { to:'/phbCreate', defaultBack:getToken()? '/dashboard': '/home',
      from:[
        {case:['/phb','/home'],back:from.fullPath},
      ]
    },
    { to:'/phbConfirm',defaultBack:{path:'/phbCreate',query:to.query},
      from:[
        {case:['/phbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/phbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
    
    //hcb
    { to:'/hcb', defaultBack:'/' },
    { to:'/hcbCreate', defaultBack:'/dashboard',
      from:[
        {case:['/hcb','/home'],back:from.fullPath},
      ]
    },
    { to:'/hcbConfirm',defaultBack:{path:'/hcbCreate',query:to.query},
      from:[
        {case:['/hcbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/hcbOrderDetails',defaultBack:'/hcbOrders?type=unpaid',
      from:[
        {case:['/hcbOrders'],back:from.fullPath}
      ]
    },
    { to:'/hcbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
    
    //dchynb
    { to:'/dchynb', defaultBack:'/' },
    { to:'/dchynbCreate', defaultBack:'/dashboard',
      from:[
        {case:['/dchynb','/home'],back:from.fullPath},
      ]
    },
    { to:'/dchynbConfirm',defaultBack:{path:'/dchynbCreate',query:to.query},
      from:[
        {case:['/dchynbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/dchynbOrderDetails',defaultBack:'/dchynbOrders?type=unpaid',
      from:[
        {case:['/dchynbOrders'],back:from.fullPath}
      ]
    },
    { to:'/dchynbOrders',defaultBack:'/dashboard',
      from:[
        {case:['/home'],back:'/home'},
      ]
    },
  
    //zxb
    { to:'/zxb', defaultBack:'/' },
    { to:'/zxbDescription', defaultBack: to.query.orderId ? {path:'/zxbConfirm',query:to.query} :'/dashboard',},
    { to:'/zxbDeposit', defaultBack: {path:'/zxbDescription',query:to.query},},
    { to:'/zxbAgree', defaultBack:'/dashboard' },
    { to:'/zxbCreate',defaultBack:'/dashboard',
      from:[
        {case:['/zxb'], back:'/zxb'},
        {case:['/zxbOrders','/home'], back:from.fullPath},
      ]
    },
    { to:'/zxbConfirm', defaultBack:{path:'/zxbCreate',query:to.query},
      from:[
        {case:['/zxbOrders','/home'],back:from.fullPath},
      ]
    },
    { to:'/zxbOrders', defaultBack:'/dashboard',
      from:[
        {case:['/home'], back:'/'},
      ]
    },
    
    //axjkx
		{ to:'/axjkx', defaultBack:'/' },
		{ to:'/axjkxRisk',defaultBack:'/',
      from:[
        {case:['/dashboard','axjkx'],back:from.fullPath}
      ]
    },
		{ to:'/axjkxCreate',defaultBack:'/axjkxRisk',
			from:[
				{case:['/axjkxConfirm','/axjkxDetail'], back:from.fullPath},
			]
		},
		{ to:'/axjkxConfirm', defaultBack:{path:'/axjkxCreate',query:to.query}},
		{ to:'/axjkxDetail', defaultBack:from.fullPath,},
		{ to:'/axjkxPaySuccess', defaultBack:from.fullPath,},
		{ to:'/axjkxOrders', defaultBack:'/dashboard',
			from:[
				{case:['/home'], back:'/'},
			]
		},
    
    //公共组件页面
    { to:'/policyDown', defaultBack:from.fullPath,
      from:[
        {case:['/policyUp'],back:{path:'/'+to.query.product+'Orders',query:{type:'unpaid'}}}
      ]
    },
    { to:'/policyUp', defaultBack:{path:'/policyDown',query:to.query} },
    { to:'/pay',defaultBack:from.fullPath },
    { to:'/comment',defaultBack:from.fullPath },
		{ to:'/userComment',defaultBack:from.fullPath },

    //其他和设置
    { to:'/goldClaims',defaultBack:from.fullPath },
    { to:'/ygbLookUp',defaultBack:from.fullPath },
    { to:'/setting',defaultBack:'/dashboard', },
    { to:'/register',defaultBack:from.fullPath, },
    { to:'/login',defaultBack:to.query.productType?to.query.productType+'Create':'/home'},
    { to:'/setCompanyName',defaultBack:from.fullPath, },
    { to:'/setTel',defaultBack:from.fullPath, },
    { to:'/recovery',defaultBack:from.fullPath, },
    { to:'/setPayPassword',defaultBack:from.fullPath, },
    { to:'/setEmail',defaultBack:from.fullPath, },
    { to:'/setAddress',defaultBack:to.query.productType?{path:to.query.productType+'Create',query:to.query.orderId?{orderId:to.query.orderId}:{}}:'/setting'},
    { to:'/invoicePage',defaultBack:'/setting'},
    { to:'/addAddress',defaultBack:{path:'/setAddress',query:to.query}},
    //文章
    { to:'/artDetail',defaultBack:'/article',
      from:[
        {case:['/home'],back:'/home'}
      ]
    },
  ];

// console.log(from.fullPath)
  routePathArr.forEach((item)=>{
    if(item.to===getPath(to.path)){
      backUrl = item.defaultBack;
      item.from && item.from.forEach((i)=>{
        i.case.forEach((j)=>{
          if(from.path === j){
            backUrl = i.back
          }
        })
      })
    }
  });
  
  // console.log({to:getPath(to.path),from:from,backUrl})
  
  //处理 '/artDetail/127' 这类路由
  function getPath(path) {
    if(path.substring(1).indexOf('/')=== -1){
      return path
    }else{
      return '/' + path.substring(1).substring(0,path.substring(1).indexOf('/'))
    }
  }
  return backUrl;
};


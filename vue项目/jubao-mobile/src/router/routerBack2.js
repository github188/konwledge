
export const routeBack =(to,from)=> {
  //路由变化 backUrl
  let backUrl = '/';

  //结构介绍
  /*
  * to:当前页面路由
  * defaultBack:该页面默认返回路由
  * from:上一个页面的情况
  *       path:上一个页面的路由数组，back来自这些页面时对应的返回路由    多对一关系
  *        优先级:routePathArr.from.path > defaultBack【自定义默认返回路径】 > from.fullPath【默认返回路径】 ;
  *
  * */
  let routePathArr = [
    //zcb
    { to:'/zcb'},
    { to:'/zcbCreate', from:[
        {path:['/zcbConfirm'], backUrl:'/dashboard'},
      ]
    },
    { to:'/zcbConfirm'},
    { to:'/zcbOrders', defaultBack:'/dashboard',
      from:[
        {path:['/home'], backUrl:'/home'},
      ]
    },
    //ygb
    { to:'/ygb' },
    { to:'/ygbCreate', from:[
        {path:['/ygbConfirm'],backUrl:'/dashboard'},
      ]
    },
    { to:'/ygbConfirm',from:[
      {path:['/policyDown'],backUrl:{path:'/ygbCreate',query:to.query}}
    ]},
    { to:'/ygbOrders', defaultBack:'/dashboard',
      from:[
        {path:['/home'], backUrl:'/home'},
      ]
    },
    { to:'/ygbAdd' },
    { to:'/ygbChange' },
    { to:'/ygbOrderDetails' },
    { to:'/ygbDetails' },
    { to:'/ygbClause'},

    //spb
    { to:'/spb' },
    { to:'/spbCreate', from:[
        {path:['/spbConfirm'],backUrl:'/dashboard'},
      ]
    },
    { to:'/spbConfirm',from:[
      {path:'/policyDown',backUrl:'/spbCreate'}
    ] },
    { to:'/spbOrders',defaultBack:'/dashboard',
      from:[
        {path:['/home'],backUrl:'/home'},
      ]
    },
    { to:'/spbOrderDetails' },
    { to:'/spbClause' },

    //llb
    { to:'/llb' },
    { to:'/llbCreate', from:[
        {path:['/llbConfirm'],backUrl:'/dashboard'},
      ]
    },
    { to:'/llbConfirm'},
    { to:'/llbOrders',defaultBack:'/dashboard',
      from:[
        {path:['/home'],backUrl:'/home'},
      ]
    },
    //hwb
    { to:'/hwb' },
    { to:'/hwbCreate', from:[
        {path:['/hwbConfirm'],backUrl:'/dashboard'},
      ]
    },
    { to:'/hwbConfirm'},
    { to:'/hwbOrders',defaultBack:'/dashboard',
      from:[
        {path:['/home'],back:'/home'},
      ]
    },
    //phb
    { to:'/phb'},
    { to:'/phbCreate',from:[
        {path:['/phbConfirm'],backUrl:'/dashboard'},
      ]
    },
    { to:'/phbConfirm'},
    { to:'/phbOrders',defaultBack:'/dashboard',
      from:[
        {path:['/home'],back:'/home'},
      ]
    },
    //公共组件页面
    { to:'/policyDown', from:[
        {path:['/policyUp'],back:{path:'/'+to.query.product+'Orders',query:{type:'unpaid'}}}
      ]
    },
    { to:'/policyUp'},
    { to:'/pay' },

    //其他
    { to:'/goldClaims'},
    {to:'/register'}
  ];

//优先级:routePathArr.from.path > defaultBack【自定义默认返回路径】 > from.fullPath【默认返回路径】 ;
  routePathArr.forEach((item)=>{
    if(item.to===to.path){
      backUrl = item.defaultBack?item.defaultBack:from.fullPath;
      item.from && item.from.forEach((i)=>{
        i.path.forEach((j)=>{
          if(from.path === j){
            backUrl = i.backUrl;
            return ;//终止循环
          }
        })
      })
    }
  });

  console.log({to:to.path,from:from,backUrl});
  return backUrl;
};


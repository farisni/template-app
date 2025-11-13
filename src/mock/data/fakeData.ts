 const menuList = {data:[
    {
        id:"1",
        path: '/home',
        name: '首页',
        icon: 'HomeFilled',
    },
    {
        id:"2",
        path: '/mall',
        name: '商品管理',
        icon: 'GoodsFilled',
        children: [
            {
                id:"22",
                path: '/mall/brand',
                name: '品牌管理',
                icon: 'ShoppingTrolley',
            },
            {
                id:"23",
                path: '/mall/add',
                name: '添加商品',
                icon: 'DocumentAdd',
            }
        ]

    },
    {
        id:"3",
        path: '/user',
        name: '用户管理',
        icon: 'UserFilled'
    },

    {
        id:"4",
        name: '其他',
        path: '/other',
        icon: 'Share',
        children: [
            {
                id:"",
                path: '/other/page1',
                name: '页面1',
                icon: 'Open',
            },
            {
                id:"",
                path: '/other/page2',
                name: '页面2',
                icon: 'setting',
            }
        ]
    }
]}



 export const userMenus = [
  {
    name: "admin",
    menu: [
      {
        id: "1eq",
        path: '/home',
        name: '首页',
        icon: 'HomeFilled',
      },
      {
        id: "2",
        path: '/mall',
        name: '商品管理',
        icon: 'GoodsFilled',
        children: [
          {
            id: "22",
            path: '/mall/brand',
            name: '品牌管理',
            icon: 'ShoppingTrolley',
          },
          {
            id: "23",
            path: '/mall/add',
            name: '添加商品',
            icon: 'DocumentAdd',
          }
        ]
      },
      {
        id: "3",
        path: '/user',
        name: '用户管理',
        icon: 'UserFilled'
      },
        {
            id:"7",
            name: '系统管理',
            path: '/system',
            icon: 'Setting',
            children: [
                {
                    id:"",
                    path: '/system/operLogList',
                    name: '操作日志',
                    icon: 'DocumentCopy',
                }
            ]
        },
      {
        id: "4",
        name: '其他',
        path: '/other',
        icon: 'Share',
        children: [
          {
            id: "41",
            path: '/other/page1',
            name: '页面1',
            icon: 'Open',
          },
          {
            id: "42",
            path: '/other/page2',
            name: '页面2',
            icon: 'setting',
          },
            {
                id: "236",
                path: '/other/CommonTable',
                name: '列表模版',
                icon: 'setting',
            }
        ]
      }
    ]
  },
  {
    name: "ryan",
    menu: [
      {
        id: "1",
        path: '/home',
        name: '首页',
        icon: 'HomeFilled',
      },
      {
        id: "2",
        path: '/mall',
        name: '商品管理',
        icon: 'GoodsFilled',
        children: [
          {
            id: "22",
            path: '/mall/brand',
            name: '品牌管理',
            icon: 'ShoppingTrolley',
          }
        ]
      },
        {
            id: "4",
            name: '其他',
            path: '/other',
            icon: 'Share',
            children: [
                {
                    id: "41",
                    path: '/other/page1',
                    name: '页面1',
                    icon: 'Open',
                }
            ]
        }
    ]
  }
]


export default menuList

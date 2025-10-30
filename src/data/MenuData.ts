const MenuData = {data:[
    {
        id:"1",
        path: '/',
        name: '首页',
        icon: 'HomeFilled',
    },
    {
        id:"2",
        path: '/mall',
        name: '商品管理',
        icon: 'Goods',
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
        icon: 'User'
    },
    {
        id:"4",
        name: '其他',
        path: '/other',
        icon: 'CollectionTag',
        children: [
            {
                id:"",
                path: '/other/page1',
                name: '页面1',
                icon: 'Open',
                url: 'other/PageOne'
            },
            {
                id:"",
                path: '/other/page2',
                name: '页面2',
                icon: 'setting',
                url: 'other/PageTwo'
            }
        ]
    }
]}

export default MenuData

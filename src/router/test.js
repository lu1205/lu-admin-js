const list = [
    {
        id: 0,
        parentId: null,
        path: '/home',
        name: 'home',
        redirect: '',
        component: 'home/index',
        title: '首页',
        icon: 'House',
        keepAlive: 1,
        rank: 0,
        roles: ['普通用户', '管理员']
    },
    {
        id: 1,
        parentId: null,
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: '',
        title: '系统设置',
        icon: 'Setting',
        keepAlive: 0,
        roles: ['管理员']
    },
    {
        id: 11,
        parentId: 1,
        path: '/system/user',
        name: 'user',
        redirect: '',
        component: 'system/user',
        title: '用户管理',
        icon: '',
        keepAlive: 1,
        roles: ['管理员']
    },
    {
        id: 12,
        parentId: 1,
        path: '/system/backInfo',
        name: 'backInfo',
        redirect: '',
        component: 'system/backInfo',
        title: '数据备份日志',
        icon: '',
        keepAlive: 1,
        roles: ['管理员']
    },
    {
        id: 13,
        parentId: 1,
        path: '',
        name: '',
        redirect: '',
        component: '',
        title: '多级菜单1',
        icon: 'Setting',
        keepAlive: 1,
        rank: 1,
        roles: ['管理员']
    },
    {
        id: 131,
        parentId: 13,
        path: '/system/backInfo2',
        name: 'backInfo2',
        redirect: '',
        component: '/system/backInfo',
        title: '多级菜单1-1',
        icon: '',
        keepAlive: 1,
        rank: 1,
        roles: ['管理员']
    },
    {
        id: 132,
        parentId: 13,
        path: '/system/user2',
        name: 'user2',
        redirect: '',
        component: '/system/user',
        title: '多级菜单1-2',
        icon: '',
        keepAlive: 1,
        rank: 1,
        roles: ['管理员']
    },{
        id: 1311,
        parentId: 13,
        path: '',
        name: '',
        redirect: '',
        component: '',
        title: '多级菜单2',
        icon: 'Setting',
        keepAlive: 1,
        rank: 1,
        roles: ['管理员']
    },
    {
        id: 13111,
        parentId: 1311,
        path: '/system/backInfo3',
        name: 'backInfo3',
        redirect: '',
        component: '/system/backInfo',
        title: '多级菜单2-1',
        icon: '',
        keepAlive: 1,
        rank: 1,
        roles: ['管理员']
    },
]

function treeData(arr) {
    let cloneData = JSON.parse(JSON.stringify(arr))  // 对源数据深度克隆
    return cloneData.filter(father => {
        let branchArr = cloneData.filter(child => father.id === child.parentId)  //返回每一项的子级数组
        branchArr.length > 0 ? father.children = branchArr : ''  //如果存在子级，则给父级添加一个children属性，并赋值
        return !father.parentId;   //返回第一层
    });
}

let data=[
    {id:1,parentId:0,name:"一级菜单A",rank:1},
    {id:2,parentId:0,name:"一级菜单B",rank:1},
    {id:3,parentId:0,name:"一级菜单C",rank:1},
    {id:4,parentId:1,name:"二级菜单A-A",rank:2},
    {id:5,parentId:1,name:"二级菜单A-B",rank:2},
    {id:6,parentId:2,name:"二级菜单B-A",rank:2},
    {id:7,parentId:4,name:"三级菜单A-A-A",rank:3},
    {id:8,parentId:7,name:"四级菜单A-A-A-A",rank:4},
    {id:9,parentId:8,name:"五级菜单A-A-A-A-A",rank:5},
    {id:10,parentId:9,name:"六级菜单A-A-A-A-A-A",rank:6},
    {id:11,parentId:10,name:"七级菜单A-A-A-A-A-A-A",rank:7},
    {id:12,parentId:11,name:"八级菜单A-A-A-A-A-A-A-A",rank:8},
    {id:13,parentId:12,name:"九级菜单A-A-A-A-A-A-A-A-A",rank:9},
    {id:14,parentId:13,name:"十级菜单A-A-A-A-A-A-A-A-A-A",rank:10},
];
const result = treeData(list)
console.log(result)

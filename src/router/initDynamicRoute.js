import router from '@/router'
import {useRouteStore} from '@/store/route'
import {useUserStore} from '@/store/user'

export const initRoute = async () => {
    const routes = [
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
            redirect: '/system/backInfo',
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
            component: 'system/backInfo',
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
            component: 'system/user',
            title: '多级菜单1-2',
            icon: '',
            keepAlive: 1,
            rank: 1,
            roles: ['管理员']
        },
        {
            id: 1311,
            parentId: 13,
            path: '',
            name: '',
            redirect: '/system/backInfo3',
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
            component: 'system/backInfo',
            title: '多级菜单2-1',
            icon: '',
            keepAlive: 1,
            rank: 1,
            roles: ['管理员']
        }
    ]
    const roles = useUserStore().getUser()?.roles || []

    const routeList = []
    routes?.forEach((item) => {
        const hasRoles = roles.filter((r) => item.roles?.includes(r))
        if (hasRoles.length) {
            routeList.push(handleRoute(item))
        }
    })
    const routeTree = formatRoute(routeList)

    // 把路由追加到index，形成嵌套路由，或者直接处理成嵌套路由，直接添加
    routeTree.forEach((item) => {
        router.addRoute('/', item)
    })
    // 存储到本地缓存，用于渲染菜单
    useRouteStore().setRouteList(routeList)
}

// 处理路由信息
export const handleRoute = (data) => {
    return {
        ...data,
        component: data.component ? getComponent(data.component) : '',
        meta: {
            title: data.title,
            icon: data.icon,
            keepAlive: data.keepAlive,
            roles: data?.roles || []
        }
    }
}

// 导入组件，vite 中需要使用 import.meta.glob()，匹配多级目录需要使用
const modules = import.meta.glob(['@/views/**/*.vue', '@/views/**/*.tsx', '@/views/**/*.jsx'])

// 获取组件实例
export function getComponent(path) {
    return (
      modules[`/src/views/${path}.vue`] ||
      modules[`/src/views/${path}.tsx`] ||
      modules[`/src/views/${path}.jsx`]
    )
    // return () =>
    //     modules[`/src/views/${path}.vue`]() ||
    //     modules[`/src/views/${path}.tsx`]() ||
    //     modules[`/src/views/${path}.jsx`]()

}

// 格式化路由（转成菜单数结构，渲染菜单）
export const formatRoute = (data) => {
    return data.filter((father) => {
        const branchArr = data.filter((child) => father.id === child.parentId) //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : '' //如果存在子级，则给父级添加一个children属性，并赋值
        return !father.parentId //返回第一层
    })
}

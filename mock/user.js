const userList = [
  {
    userId: 1,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'admin',
    password: '111111',
    desc: '平台管理员',
    roles: ['平台管理员'],
    buttons: ['cuser.detail'],
    routes: ['home'],
    token: 'Admin Token'
  },
  {
    userId: 2,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'system',
    password: '111111',
    desc: '系统管理员',
    roles: ['系统管理员'],
    buttons: ['cuser.detail', 'cuser.user'],
    routes: ['home'],
    token: 'System Token'
  }
]
const menuList = [
  {
    id: 1,
    parentId: '',
    path: '/home',
    name: 'home',
    redirect: '',
    component: 'home/index',
    title: '首页',
    icon: 'House',
    keepAlive: 1,
    roles: ['普通用户', '管理员']
  },
  {
    id: 2,
    parentId: null,
    path: '',
    name: '',
    redirect: '/system/user',
    component: '',
    title: '系统设置',
    icon: 'Setting',
    keepAlive: 0,
    roles: ['管理员']
  },
  {
    id: 21,
    parentId: 2,
    path: '/system/user',
    name: 'user',
    redirect: '',
    component: 'system/user',
    title: '用户管理',
    icon: '',
    keepAlive: 1,
    roles: ['管理员']
  }
]

export default [
  // 用户登录
  {
    url: '/lu-admin/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const checkUser = userList.find(
        (item) => item.username === username && item.password === password
      )
      if (!checkUser) {
        return {
          code: 201,
          data: null,
          message: '账号或密码错误',
          type: 'error'
        }
      }
      return {
        code: 200,
        data: {
          username: 'admin',
          nickname: '张三',
          token: 'admin token'
        },
        message: 'success',
        type: 'success'
      }
    }
  },
  // 获取用户菜单
  {
    url: '/lu-admin/getMenuList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: menuList,
        message: 'success',
        type: 'success'
      }
    }
  }
]

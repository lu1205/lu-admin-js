import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref({
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token'
    })
    const token = ref('')

    const setToken = (val) => {
      token.value = val
    }
    const getToken = () => {
      return token.value
    }
    const clearToken = () => {
      token.value = ''
    }
    const setUser = (val) => {
      user.value = val
    }
    const getUser = () => {
      return user.value
    }

    const clearUser = () => {
      user.value = {}
      token.value = ''
    }

    return { user, token, setToken, getToken, clearToken, setUser, getUser, clearUser }
  },
  {
    persist: {
      key: 'user',
      storage: sessionStorage,
      paths: ['user', 'token']
    }
  }
)

import axios from 'axios'

import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import router from '@/router'

class Request {
  instance = null
  abortControllerMap = null

  constructor(config) {
    this.instance = axios.create(config)
    this.abortControllerMap = new Map()
    this.instance.interceptors.request.use(
      async (config) => {
        if (config.url !== '/api/login') {
          config.headers['Authorization'] = useUserStore().getToken()
        }
        const controller = new AbortController()
        const url = config.url || ''
        config.signal = controller.signal
        this.abortControllerMap.set(url, controller)

        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      async (response) => {
        const url = response.config.url || ''
        this.abortControllerMap.delete(url)
        if (response.data.code === 200) {
          return Promise.resolve(response.data)
        } else if (response.data.code === 403) {
          // window.location.href = `/login?redirect=${router.currentRoute.value.fullPath}`
          ElMessage.error('请重新登录')
          await router.push({
            path: '/login',
            query: { redirect: router.currentRoute.value.fullPath },
            replace: true
          })
        } else if (response.data.code === 500 || response.data.code === 201) {
          return ElMessage.error(response.data.message)
        } else {
          return Promise.resolve(response.data)
        }
      },
      (err) => {
        return ElMessage.error(err.response.statusText)
      }
    )
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  // 取消指定的请求
  cancelRequest(url) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }

  request(config) {
    return this.instance.request(config)
  }

  get(url, config) {
    return this.instance.get(url, config)
  }

  post(url, data, config) {
    return this.instance.post(url, data, config)
  }
}

export const httpRequest = new Request({
  baseURL: ''
})

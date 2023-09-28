import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRouteStore = defineStore('userRoute', () => {
  const routeList = ref([])
  const firstRoute = ref()

  const setRouteList = (val) => {
    routeList.value = val
  }
  const getRouteList = () => {
    return routeList.value
  }

  const clearRouteList = () => {
    routeList.value = []
  }

  const setFirstRoute = (val) => {
    firstRoute.value = val
  }

  const getFirstRoute = () => {
    return firstRoute.value
  }

  const clearFirstRoute = () => {
    firstRoute.value = null
  }

  return {
    routeList,
    firstRoute,
    setRouteList,
    getRouteList,
    clearRouteList,
    setFirstRoute,
    getFirstRoute,
    clearFirstRoute
  }
})

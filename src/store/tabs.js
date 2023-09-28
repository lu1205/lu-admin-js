import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCachePagesStore } from '@/store/cachePages'

export const useTabsStore = defineStore(
  'tabs',
  () => {
    const tabArr = ref([])
    const router = useRouter()
    const route = useRoute()

    function getTabs() {
      return tabArr.value
    }

    function addTab(item) {
      tabArr.value.push(item)
    }

    /*
     * 删除tab
     * */
    async function removeTab(path) {
      // 不能删除首页
      const length = tabArr.value.length
      if (length === 1) return
      const index = tabArr.value.findIndex((item) => item.path === path)
      // index !== -1 && tabArr.value.splice(index, 1)
      if (index > -1) {
        useCachePagesStore().removeCachePage(tabArr.value[index].name)
        tabArr.value.splice(index, 1)
      }
      // 删除的不是当前选中的页面，不跳转页面
      if (path !== router.currentRoute.value.fullPath) return
      if (index < length - 1) {
        // 删除非最后一个页面，跳转下个页面
        await router.push({ path: tabArr.value[index].path, replace: true })
      } else {
        // 删除最后一个，跳转上个页面
        await router.push({ path: tabArr.value[index - 1].path, replace: true })
      }
    }

    /*
     * 删除其他tab
     * */
    function removeOtherTab() {
      tabArr.value = tabArr.value.filter(
        (item) => item.path === route.path || item.path === '/' || item.path === '/home'
      )
      const cacheArr = useCachePagesStore()
        .getCachePages()
        .filter((item) => tabArr.value.map((item2) => item2.name).includes(item))
      useCachePagesStore().setCachePage(cacheArr)
    }

    /*
     * 重置Tab
     * */
    function resetTab() {
      tabArr.value = tabArr.value.filter((item) => item.path === '/' || item.path === '/home')
      router.push({ path: '/', replace: true })
      useCachePagesStore().setCachePage(['home'])
    }

    return { tabArr, getTabs, addTab, removeTab, removeOtherTab, resetTab }
  },
  {
    persist: {
      key: 'tabs',
      storage: localStorage,
      paths: ['tabArr']
    }
  }
)

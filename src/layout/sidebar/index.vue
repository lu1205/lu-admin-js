<template>
  <div class="app-slide" :style="{ width: collapse ? 'auto' : '' }">
    <el-scrollbar>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        :collapse="collapse"
        :unique-opened="false"
        :collapse-transition="false"
        :default-active="route.path"
        router
        @select="selectPath"
      >
        <SideItem :routes="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SideItem from './component/sideItem.vue'
import { useSettingStore } from '@/store/setting'

const route = useRoute()
import { useRouteStore } from '@/store/route'
import { useRoute } from 'vue-router'

const collapse = computed(() => {
  return useSettingStore().getCollapse()
})

import { formatRoute } from '@/router/initDynamicRoute'

let menuList = formatRoute(useRouteStore().getRouteList())

import { useTabsStore } from '@/store/tabs'
import { useCachePagesStore } from '@/store/cachePages'

const tabsArr = computed(() => {
  return useTabsStore().getTabs()
})
const selectPath = (indexPath) => {
  const allRoutes = useRouteStore().getRouteList() || []
  const index = tabsArr.value.findIndex((item) => item?.path === indexPath)
  let routeItem = null
  if (index === -1) {
    routeItem = findRouteByIndexPath(indexPath, allRoutes)
    useTabsStore().addTab(routeItem)
    // 判断页面是否可缓存
    if (routeItem.keepAlive === 1) {
      useCachePagesStore().addCachePage(routeItem.name)
    }
  }
}
const findRouteByIndexPath = (indexPath, routeArr) => {
  let findItem = null
  if (routeArr.length > 0 && indexPath) {
    for (let i = 0; i < routeArr.length; i++) {
      let item = routeArr[i]
      if (item.path === indexPath && !item?.redirect && !item?.children) {
        findItem = item
        break
      } else if (item.children) {
        if (findItem) break
        findItem = findRouteByIndexPath(indexPath, item.children)
      }
    }
    return findItem
  }
}
</script>
<style scoped lang="scss">
:deep(.el-scrollbar__view ul) {
  border-right: 0;
}
</style>

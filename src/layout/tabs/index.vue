<script setup>
import { Menu, Close, FolderRemove, FolderDelete } from '@element-plus/icons-vue'

import {computed, ref} from 'vue'
import {useTabsStore} from "@/store/tabs";
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
// const tabList = ref([
//   { path: '/1', name: '标签1', icon: 'menu' },
//   { path: '/2', name: '标签2' },
//   { path: '/3', name: '标签3' },
//   { path: '/4', name: '标签4' },
//   { path: '/5', name: '标签5' },
//   { path: '/6', name: '标签6' },
//   { path: '/7', name: '标签7' },
//   { path: '/8', name: '标签8' },
//   { path: '/9', name: '标签9' },
//   { path: '/10', name: '标签10' },
//   { path: '/11', name: '标签11' },
//   { path: '/12', name: '标签12' },
//   { path: '/13', name: '标签13' },
//   { path: '/14', name: '标签14' }
// ])
const tabList = computed(()=>{
    return useTabsStore().getTabs()
})
const currentPath = computed(()=>{
    return useRoute().path
})
const delTag = (path) => {
  /*const index = tabList.value.findIndex((item) => item.path === path)
  tabList.value.splice(index, 1)
  if (currentPath.value === path) {
    if (tabList.value[index]?.path) {
      currentPath.value = tabList.value[index].path
    } else {
      currentPath.value = tabList.value[index - 1]?.path || '/'
    }
  }*/
    useTabsStore().removeTab(path)
}
const delOtherTag = () => {
  // const val = tabList.value.find((item) => item.path === currentPath.value)
  // tabList.value = [val]
    useTabsStore().removeOtherTab()
}
const delAllTag = () => {
  // tabList.value = []
    useTabsStore().resetTab()
}
const handleClick = (path) => {
  // currentPath.value = path
    router.push(path)
}
const handleClose = (type) => {
  switch (type) {
    case 'current':
      delTag(currentPath.value)
      break
    case 'other':
      delOtherTag()
      break
    case 'all':
      delAllTag()
      break
  }
}
</script>

<template>
  <div class="app-tabs">
    <div style="flex: 1; overflow: hidden">
      <el-tabs type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.name">
          <template #label>
            <el-tag
              :closable="item.path !== '/' && item.path !== '/home'"
              :type="currentPath === item.path ? '' : 'info'"
              @click="handleClick(item.path)"
              @close="delTag(item.path)"
            >
              <div style="display: flex; align-items: center; justify-content: center">
                <el-icon v-if="item.meta.icon" size="16" style="margin-right: 4px"><Menu /></el-icon>
                <span>{{ item.meta.title }}</span>
              </div>
            </el-tag>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div style="width: 24px; padding: 0 16px; display: flex; align-items: center">
      <el-dropdown>
        <div class="more">
          <el-icon size="20"><Menu /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="dropdown-item" @click="handleClose('current')">
                <el-icon size="20"><Close /></el-icon>
                <span>关闭当前</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="dropdown-item" @click="handleClose('other')">
                <el-icon size="20"><FolderRemove /></el-icon>
                <span>关闭其他</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="dropdown-item" @click="handleClose('all')">
                <el-icon size="20"><FolderDelete /></el-icon>
                <span>关闭所有</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../styles/base.scss';
:deep(.el-tabs__content) {
  display: none !important;
}
:deep(.el-tabs__header) {
  background-color: #fff;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.el-tabs__item) {
  border: none !important;
  padding: 0 8px !important;
}
.dropdown-item {
  display: flex;
  align-items: center;
}
:deep(.el-tabs__nav-prev) {
  line-height: $app-tabs-height;
}
:deep(.el-tabs__nav-next) {
  line-height: $app-tabs-height;
}
.more {
  transition: transform 0.5s;
}
.more:hover {
  transform: rotate(90deg);
}
</style>

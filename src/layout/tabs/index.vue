<script setup>
import { Menu, Close, FolderRemove, FolderDelete } from '@element-plus/icons-vue'

import { computed } from 'vue'
import { useTabsStore } from '@/store/tabs'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const tabList = computed(() => {
  return useTabsStore().getTabs()
})
const currentPath = computed(() => {
  return useRoute().path
})
const delTag = (path) => {
  useTabsStore().removeTab(path)
}
const delOtherTag = () => {
  useTabsStore().removeOtherTab()
}
const delAllTag = () => {
  useTabsStore().resetTab()
}
const handleClick = (path) => {
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
              <div style="display: flex; justify-content: center; align-items: center">
                <el-icon v-if="item.meta.icon" size="16" style="margin-right: 4px"
                  ><Menu
                /></el-icon>
                <span>{{ item.meta.title }}</span>
              </div>
            </el-tag>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div style="display: flex; align-items: center; padding: 0 16px; width: 24px">
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
@import '../../styles/base';

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
  padding: 0 8px !important;
  border: none !important;
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

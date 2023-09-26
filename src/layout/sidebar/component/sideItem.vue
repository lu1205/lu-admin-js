<template>
  <template v-for="item in menuList" :key="item.id">
    <el-menu-item v-if="!item.children" :index="item.path + ''">
      <el-icon v-if="item.meta.icon">
        <component :is="getIcon(item.meta.icon)"></component>
      </el-icon>
      <template #title>
        <div :class="[item.parentId ? 'ml-[10px]' : '']" class="h-[100%]">
          <span>{{ item.meta.title }}</span>
        </div>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.id + ''">
      <template #title>
        <el-icon>
          <component :is="getIcon(item.meta.icon)"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children && item.children.length > 0">
        <sideItem :routes="item.children" />
      </template>
      <template v-else>
        <el-menu-item :index="item.path + ''">
          <div :class="[item.parentId ? 'ml-[10px]' : '']">
            <el-icon v-if="item.meta.icon">
              <component :is="getIcon(item.meta.icon)"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </div>
        </el-menu-item>
      </template>
    </el-sub-menu>
  </template>
</template>

<script setup>
import { Setting, Reading, Document, DocumentChecked, House } from '@element-plus/icons-vue'
import { ref } from 'vue'
const icons = {
  Setting,
  Reading,
  Document,
  DocumentChecked,
  House
}
const getIcon = (name) => {
  return icons[name]
}
const props = defineProps(['routes'])
let menuList = ref(props.routes ?? [])
</script>

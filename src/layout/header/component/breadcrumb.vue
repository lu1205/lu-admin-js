<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
let levelList = ref([])

const getBreadcrumb = () => {
  levelList.value = router.currentRoute.value.matched.filter((item) => {
    if (item.path !== '/home') return item
  })
}
getBreadcrumb()
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
const handleBreadcrumb = (val) => {
  let path = val.path === '/' ? val.redirect : ''
  path =
    path ||
    (val.redirect ? val?.children.length > 0 && val.children[0].path : val.redirect) ||
    val.path
  return { path: path }
}
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
const { collapse } = storeToRefs(useSettingStore())
</script>

<template>
  <div style="display: flex; align-items: center">
    <div
      style="display: flex; align-items: center; margin-right: 16px; height: 20px; cursor: pointer"
      @click="() => useSettingStore().changeCollapse()"
    >
      <el-icon size="20">
        <Expand v-if="collapse" />
        <Fold v-else />
      </el-icon>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="index"
        :to="handleBreadcrumb(item)"
      >
        <p>
          {{ item.meta.title }}
        </p>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

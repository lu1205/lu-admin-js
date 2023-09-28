<script setup>
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useSettingStore } from '@/store/setting'
const { loading } = storeToRefs(useSettingStore())
</script>

<template>
  <div v-loading="loading">
    <el-config-provider :locale="zhCn">
      <RouterView />
    </el-config-provider>
  </div>
</template>

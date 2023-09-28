<script setup>
import { useCachePagesStore } from '@/store/cachePages'
import { computed } from 'vue'
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
const keepAliveList = computed(() => {
  return useCachePagesStore().getCachePages()
})
const { flush } = storeToRefs(useSettingStore())
</script>

<template>
  <el-scrollbar>
    <RouterView v-slot="{ Component, route }" v-if="!flush">
      <Transition mode="out-in">
        <KeepAlive :include="keepAliveList">
          <component :key="route.fullPath" :is="Component" />
        </KeepAlive>
      </Transition>
    </RouterView>
  </el-scrollbar>
</template>

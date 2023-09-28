<template>
  <div>用户{{ count }}</div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'

const count = ref(0)
const time = setInterval(() => {
  count.value++
}, 1000)
onUnmounted(() => {
  clearInterval(time)
})
</script>

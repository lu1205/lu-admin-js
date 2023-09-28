<script setup>
import Error404 from '@/assets/svg/404.svg'
</script>

<template>
  <div class="out-box">
    <el-empty :image="Error404" description="页面未找到" />
  </div>
</template>

<style scoped lang="scss">
.out-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>

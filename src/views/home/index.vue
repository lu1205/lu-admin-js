<script setup>
import { ref, onMounted } from 'vue'
import { getEleHeight } from '../../util/getElementStyle'
const value = ref()
const header = ref()
const content = ref()
onMounted(() => {
  if (header.value) {
    content.value.style.height = `calc(100% - ${getEleHeight(header.value)}px)`
  }
})
</script>
<template>
  <div style="height: 100%">
    <div class="btn-box" ref="header">
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
      <el-input style="margin: 0 10px 10px 0" v-model="value" placeholder="Please input" />
    </div>
    <div class="content" ref="content">
      <el-scrollbar>
        <h1>welcome1</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome</h1>
        <h1>welcome12</h1>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-box {
  display: flex;
  flex-wrap: wrap;
  float: left;
  padding: 10px 0;
  box-sizing: border-box;
}

.content {
  float: right;
  overflow: auto;
  width: 100%;
  height: 100%;
}
</style>

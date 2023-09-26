<script setup>
import Header from './header/index.vue'
import Tabs from './tabs/index.vue'
import Main from './main/index.vue'
import SideBar from './sidebar/index.vue'
import Footer from './footer/index.vue'
</script>

<template>
  <div class="app-container">
    <SideBar />
    <div class="app-main">
      <div class="app-top">
        <Header />
        <Tabs />
      </div>
      <Main />
      <Footer />
    </div>
  </div>
</template>

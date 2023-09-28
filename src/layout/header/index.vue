<script setup>
import Breadcrumb from './component/breadcrumb.vue'
import { Refresh, FullScreen, Setting, ArrowDown, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/store/route'
import { useSettingStore } from '@/store/setting'
import { nextTick } from 'vue'

const router = useRouter()
const logout = () => {
  useUserStore().clearToken()
  useUserStore().clearUser()
  useRouteStore().clearRouteList()
  router.replace('/login')
}

const flush = () => {
  useSettingStore().setLoading(true)
  useSettingStore().setFlush(true)
  nextTick(() => {
    setTimeout(() => {
      useSettingStore().setFlush(false)
      useSettingStore().setLoading(false)
    }, 500)
  })
}
</script>

<template>
  <div class="app-header">
    <div class="breadcrumb-box">
      <Breadcrumb />
      <div style="display: flex; align-items: center; padding-right: 16px">
        <el-tooltip content="刷新" effect="light">
          <div class="circle-btn" @click="flush">
            <el-icon size="18">
              <Refresh />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="全屏" effect="light">
          <div class="circle-btn">
            <el-icon size="18">
              <FullScreen />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="设置" effect="light">
          <div class="circle-btn">
            <el-icon size="18">
              <Setting />
            </el-icon>
          </div>
        </el-tooltip>
        <div class="circle-btn" style="margin-right: 8px">
          <img
            style="width: 32px; height: 32px; border-radius: 50%"
            src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
            alt=""
          />
        </div>
        <div style="display: flex; justify-content: center; align-items: center">
          <el-dropdown>
            <div style="display: flex; justify-content: center; align-items: center">
              <div>admin</div>
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="dropdown-item" @click="logout">
                    <el-icon size="16">
                      <SwitchButton />
                    </el-icon>
                    <span>退出登录</span>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  height: 100%;
}

.circle-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  width: 30px;
  height: 30px;
  border: 1px solid #aaa;
  border-radius: 50%;
}

.dropdown-item {
  display: flex;
  align-items: center;
}
</style>

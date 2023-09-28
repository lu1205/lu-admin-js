import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore(
  'settingStore',
  () => {
    const settingConfig = ref({
      slideWidth: 200
    })
    const collapse = ref(false)
    const loading = ref(false)
    const flush = ref(false)

    function setCollapse(flag) {
      collapse.value = flag
    }
    function changeCollapse() {
      collapse.value = !collapse.value
    }

    function getCollapse() {
      return collapse.value
    }

    const setLoading = (val) => {
      loading.value = val
    }

    const getLoading = () => {
      return loading.value
    }

    const setFlush = (flag) => {
      flush.value = flag
    }
    const getFlush = () => {
      return flush.value
    }

    return {
      collapse,
      settingConfig,
      loading,
      flush,
      setCollapse,
      changeCollapse,
      getCollapse,
      setLoading,
      getLoading,
      setFlush,
      getFlush
    }
  },
  {
    persist: {
      key: 'setting',
      storage: localStorage,
      paths: ['settingConfig', 'collapse']
    }
  }
)

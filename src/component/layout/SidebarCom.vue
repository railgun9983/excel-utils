<template>
  <n-layout-sider
    class="sider-wrap"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :value="route.name"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script setup lang="ts">
import { ref, h, Suspense } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { routes } from '@/router'
import { CustomIcon } from '../custom/CustomIcon'

const route = useRoute()
const collapsed = ref(false)

const menuOptions = routes.map((it) => ({
  label: () => h(RouterLink, { to: { path: it.path } }, { default: () => it.meta.label }),
  key: it.name ?? it.path,
  icon: () => h(Suspense, null, h(CustomIcon, { icon: it.meta.icon })),
  children: (it.children ?? []).map((item) => ({
    label: () =>
      h(
        RouterLink,
        { to: { path: it.path + '/' + item.path } },
        { default: () => item.meta?.label }
      ),
    key: item.name ?? item.path,
    icon: () => h(Suspense, null, h(CustomIcon, { icon: item.meta?.icon }))
  }))
}))
</script>

<style scoped>
.sider-wrap {
  margin-right: 10px;
  height: 100vh;
}
</style>

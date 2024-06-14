<template>
  <n-space vertical>
    <n-layout>
      <HeaderCom />
    </n-layout>
    <n-layout has-sider>
      <SidebarCom />
      <n-layout embedded content-style="padding: 24px;">
        <n-card>
          <RouterView />
        </n-card>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderCom from './HeaderCom.vue'
import SidebarCom from './SidebarCom.vue'
</script>
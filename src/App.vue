<script setup>
import { RouterView } from 'vue-router'
import { darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <RouterView></RouterView>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>

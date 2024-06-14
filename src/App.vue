<script setup>
import { RouterView } from 'vue-router'
import { lightTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="lightTheme">
    <n-message-provider>
      <RouterView></RouterView>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>

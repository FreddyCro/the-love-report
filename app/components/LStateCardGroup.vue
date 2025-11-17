<script lang="ts" setup></script>

<template>
  <div class="state-card-group">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.state-card-group {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

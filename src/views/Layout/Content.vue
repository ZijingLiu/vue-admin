<template>
  <div class="content" :class="{'nav-collapse': this.$store.state.app.isCollapse}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
 }
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  top: 75px;
  left: 250px;
  right: 0;
  bottom: 0;
  padding: 30px;
  height: 100%;
  border: 30px solid #f8f8f8;
  box-sizing: border-box;
}
</style>
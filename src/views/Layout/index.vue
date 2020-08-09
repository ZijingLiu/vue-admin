<template>
  <div class="layout">
      <div class="left" :class="{'close': this.$store.state.app.isCollapse}">
          <LayoutNav></LayoutNav>
      </div>
      <div class="right">
            <LayoutHeader></LayoutHeader>
            <LayoutContent></LayoutContent>
      </div>
  </div>
</template>

<script>
import LayoutHeader from './Header';
import LayoutContent from './Content';
import LayoutNav from './Nav';

export default {
    components: {
        LayoutHeader,
        LayoutContent,
        LayoutNav
    }
}
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    .left {
        width: 250px;
        height: 100vh;
    }
    .right {
        flex: 1;
    }
}
.close {
  width: 65px !important;
}
</style>
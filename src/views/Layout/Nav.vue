<template>
  <div class="nav-wrapper">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="transparent"
      router
      :collapse="this.$store.state.app.isCollapse"
    >
      <template v-for="(item) in this.menu">
        <el-submenu v-if="item.hidden != true" :key="item.id" :index="item.path">
          <template slot="title">
            <svg-icon :iconClass= "item.meta.icon"  :className= "item.meta.icon"></svg-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for=" (subItem) in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import router from "vue-router";
export default {
  data() {
    return {
      menu: this.$router.options.routes
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
}
svg {
  font-size: 20px;
  margin-right: 10px;
}
</style>
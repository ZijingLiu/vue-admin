<template>
  <div class="header-wrapper" :class="{'nav-collapse': this.$store.state.app.isCollapse}">
      <div class="pull-left header-icon"><svg-icon :iconClass="`menu`" :className="`menu`" @click="toggleMenu"></svg-icon></div>
      <div class="pull-right">
        <div class="user-info pull-left">
          {{ username }}
        </div>
        <div class="pull-left exit-icon">
          <svg-icon :iconClass="`exit`" :className="`exit`" @click="exit"></svg-icon>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.login.username;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
    exit() {
      this.$router.push({
        path: "/login"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  height: 75px;
  background: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.header-icon {
  padding: 0 35px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  cursor: pointer;;
}
.exit-icon {
  padding: 0 35px;
  svg {
    margin-bottom: -5px;
    cursor: pointer;
  }
}
</style>
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.iconClass) {
        return `svg-icon ${this.className}`;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1.4em;
  height: 1.4em;
  // vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
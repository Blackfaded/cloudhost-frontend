<template>
  <div class="box">
    <slot name="header"></slot>

    <div class="boxBody" :style="style"><slot name="body"></slot></div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    maxHeight: Number
  },
  computed: {
    style() {
      return {
        'border-bottom': this.$slots.footer ? '1px solid var(--devider-color)' : '',
        'border-top': this.$slots.header ? '1px solid var(--devider-color)' : '',
        'max-height': this.maxHeight ? `${this.maxHeight}px` : ''
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  color: #000;
  margin: 10px 0;
  background-color: #ffffff;
  box-shadow: 10px 11px 59px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  & > * {
    padding: 15px;
  }
  &Body {
    overflow-y: auto;
  }
}
</style>

<template>
  <div class="box">
    <slot name="header"></slot>

    <div class="boxBody" :style="style"><slot name="body"></slot></div>

    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  computed: {
    style() {
      return {
        'border-bottom': this.$slots.footer ? '1px solid rgb(202, 202, 202)' : '',
        'border-top': this.$slots.header ? '1px solid rgb(202, 202, 202)' : ''
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  color: #000;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 10px 11px 59px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  & > * {
    padding: 15px;
  }
  &Body {
    max-height: 500px;
    overflow-y: auto;
  }
}
</style>

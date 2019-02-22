<template>
  <transition name="modal-fade">
    <div class="mask" @click.self="close">
      <base-box class="content">
        <slot name="header" slot="header"></slot> <slot name="body" slot="body"></slot>
        <slot name="footer" slot="footer"></slot>
      </base-box>
    </div>
  </transition>
</template>

<script>
import BaseBox from '../boxes/BaseBox';

export default {
  props: {
    showModal: Boolean,
    maskdisabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BaseBox
  },
  methods: {
    close() {
      if (!this.maskdisabled) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mask {
  z-index: 1000;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 500px;
  }
}
</style>

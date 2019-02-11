<template>
  <button class="button" :class="{ disabled }" :style="style" @click="click" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        // The value must match one of these strings
        return ['primary', 'success', 'warning', 'danger', 'custom'].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    style() {
      return {
        backgroundColor: this.variant === 'custom' ? '' : `var(--${this.variant})`
      };
    }
  },
  methods: {
    click() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  color: var(--text);
  outline: none;
  border: none;
  border-radius: 5px;
  transition: transform;
  padding: 5px 10px;
  &:hover:not(.disabled) {
    transform: scale(1.01);
    cursor: pointer;
    filter: brightness(70%);
  }
  &.disabled {
    filter: brightness(40%);
  }
}
</style>

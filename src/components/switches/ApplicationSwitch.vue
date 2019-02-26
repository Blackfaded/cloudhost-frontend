<template>
  <toggle-button
    class="toggle"
    :value="running"
    :sync="true"
    :labels="{
      checked: pending ? 'Starting...' : 'Running',
      unchecked: pending ? 'Stopping...' : 'Stopped'
    }"
    :color="{
      checked: pending ? 'var(--warning)' : 'var(--success)',
      unchecked: pending ? 'var(--warning)' : 'var(--danger)'
    }"
    :width="100"
    :height="30"
    :disabled="pending"
    @change="change"
  />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  components: {
    ToggleButton
  },
  props: {
    running: {
      type: Boolean,
      required: true
    },
    pending: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    change(value) {
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="scss" scoped></style>

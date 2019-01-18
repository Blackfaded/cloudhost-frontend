<template>
  <toggle-button
    class="toggle"
    v-model="running"
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
    @change="statusChange"
  />
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  components: {
    ToggleButton
  },
  data() {
    return {
      running: false,
      pending: false
    };
  },
  computed: {
    style() {
      return {};
    }
  },
  methods: {
    statusChange() {
      this.pending = true;
      setTimeout(() => {
        this.pending = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped></style>

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
    :disabled="pending || disabled"
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
    application: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      pending: false,
      running: false
    };
  },
  methods: {
    // toggle application status (running)
    async change({ value }) {
      const oldValue = !value;
      this.running = value;
      this.pending = true;
      try {
        // change status in backend
        await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/applications/${this.application.appName}/${
            value ? 'start' : 'stop'
          }`
        );
      } catch (error) {
        this.running = oldValue;
      }

      this.pending = false;
    }
  },
  mounted() {
    this.running = this.application.running;
  }
};
</script>

<style lang="scss" scoped></style>

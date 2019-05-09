<template>
  <base-modal @close="close" maskdisabled class="applicationDetails">
    <h3 slot="header">Create Application</h3>
    <progress-bars :socket="socket" slot="body"></progress-bars>
  </base-modal>
</template>

<script>
import ProgressBars from '@/components/application/ProgressBars';
import BaseModal from '@/components/modals/BaseModal';

export default {
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  components: {
    ProgressBars,
    BaseModal
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped></style>

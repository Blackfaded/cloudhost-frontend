<template>
  <b-container fluid>
    <h2 class="headline">
      <span>Applications (2)</span>
      <b-button variant="success" @click="showCreateApplicationModal = true">+ New</b-button>
    </h2>
    <b-row>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
    </b-row>

    <application-create-modal
      v-if="showCreateApplicationModal"
      @close="showCreateApplicationModal = false"
    ></application-create-modal>
  </b-container>
</template>
<script>
import ApplicationBox from '@/components/boxes/Application';
import ApplicationCreateModal from '@/components/modals/ApplicationCreate';

export default {
  data() {
    return {
      showCreateApplicationModal: false
    };
  },
  components: {
    ApplicationBox,
    ApplicationCreateModal
  }
};
</script>

<style lang="scss" scoped>
.headline {
  button {
    margin-left: 20px;
  }
}
</style>

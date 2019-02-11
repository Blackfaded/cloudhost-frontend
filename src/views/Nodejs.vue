<template>
  <b-container fluid>
    <div class="headline">
      <h2>Applications (2)</h2>
      <base-button variant="success" @click="showCreateApplicationModal = true">+ New</base-button>
    </div>
    <b-row>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
      <b-col md="6" lg="4"> <application-box></application-box> </b-col>
    </b-row>

    <application-create-modal
      v-if="showCreateApplicationModal"
      @close="showCreateApplicationModal = false"
      :repositories="repositories"
    ></application-create-modal>
  </b-container>
</template>
<script>
import ApplicationBox from '@/components/boxes/Application';
import ApplicationCreateModal from '@/components/modals/ApplicationCreate';

export default {
  data() {
    return {
      showCreateApplicationModal: false,
      repositories: []
    };
  },
  components: {
    ApplicationBox,
    ApplicationCreateModal
  },
  async mounted() {
    const { data } = await this.$axios.get(
      `${process.env.VUE_APP_BACKEND_URL}api/v1/users/${this.$store.state.user.email}/projects`
    );
    this.repositories = data;
  }
};
</script>

<style lang="scss" scoped>
.headline {
  display: flex;
  align-items: center;
  h2 {
    display: inline-block;
  }
  button {
    margin-left: 20px;
  }
}
</style>

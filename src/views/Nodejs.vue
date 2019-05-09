<template>
  <b-container fluid>
    <div class="headline">
      <h2>
        Applications
        <template v-if="applications.length"
          >({{ applications.length }})</template
        >
      </h2>
      <base-button variant="success" @click="showCreateApplicationModal = true">+ New</base-button>
    </div>
    <b-row>
      <b-col md="6" lg="4" v-for="(application, index) in applications" :key="index">
        <application-box :application="application"></application-box>
      </b-col>
    </b-row>

    <application-create-modal
      v-if="showCreateApplicationModal"
      @close="showCreateApplicationModal = false"
      :repositories="repositories"
      :loading="loadingRepositories"
    ></application-create-modal>
  </b-container>
</template>

<script>
import ApplicationBox from '@/components/boxes/Application';
import ApplicationCreateModal from '@/components/modals/ApplicationCreate';
import EventBus from '@/bus';

export default {
  data() {
    return {
      showCreateApplicationModal: false,
      loadingRepositories: true,
      repositories: [],
      applications: []
    };
  },
  components: {
    ApplicationBox,
    ApplicationCreateModal
  },
  methods: {
    // replace new application in applicationlist after app got created
    addApplication(newApp) {
      this.applications = this.applications.filter(app => app.mountPath !== newApp.mountPath);
      this.applications.push(newApp);
    }
  },
  async mounted() {
    try {
      // get users apps
      const { data: applications } = await this.$axios.get('/applications');
      this.applications = applications;

      // get users projects from github (proxied via api server)
      const { data } = await this.$axios.get(`/users/${this.$store.state.user.email}/projects`);
      this.repositories = data;
      this.loadingRepositories = false;
    } catch (error) {
      // display toast if an error occurs
      if (error.response && error.response.data && error.response.data.message) {
        this.$snotify.error(error.response.data.message, error.response.data.error);
      }
    }

    // add application to list when it got created
    EventBus.$on('applicationCreated', this.addApplication);
  },
  beforeDestroy() {
    // remove eventlistener when component gets destroyed
    EventBus.$off('applicationCreated');
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

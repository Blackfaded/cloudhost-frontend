<template>
  <b-container fluid v-if="application">
    <progress-modal v-if="isApplicationCreating" :socket="socket"></progress-modal>
    <b-row>
      <b-col cols="12">
        <application-details
          :application="application"
          :checkApplicationCreate="checkApplicationCreate"
          :isApplicationDeleting="isApplicationDeleting"
        ></application-details>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <container-logs :application="application"></container-logs> </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <base-box>
          <h3 slot="header">Danger Zone</h3>
          <base-button
            @click="applicationConfirm"
            variant="danger"
            slot="body"
            :disabled="isApplicationDeleting"
            >Delete Application</base-button
          >
        </base-box>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import io from 'socket.io-client';

import ApplicationDetails from '@/components/boxes/ApplicationDetails';
import ContainerLogs from '@/components/boxes/ContainerLogs';
import ProgressModal from '@/components/modals/ProgressModal';
import BaseBox from '@/components/boxes/BaseBox';
import createApplicationMixin from '@/mixins/createApplication';

export default {
  data() {
    return {
      application: null,
      isApplicationCreating: false,
      logs: '',
      socket: null,
      isApplicationDeleting: false
    };
  },
  mixins: [createApplicationMixin],
  components: {
    ApplicationDetails,
    ContainerLogs,
    BaseBox,
    ProgressModal
  },
  methods: {
    async checkApplicationCreate() {
      this.$snotify.confirm(
        'Your old application will be deleted and your new one will be deployed.',
        'Delete old application?',
        {
          closeOnClick: false,
          backdrop: 0.3,
          bodyMaxLength: 250,
          titleMaxLength: 30,
          buttons: [
            {
              text: 'Yes',
              action: toast => {
                this.$snotify.remove(toast.id);
                this.createApplicationProcess();
              }
            },
            { text: 'No', action: toast => this.$snotify.remove(toast.id) }
          ]
        }
      );
    },

    async createApplicationProcess() {
      this.isApplicationCreating = true;
      await this.createApplication({
        repositoryName: this.application.repositoryName,
        repositoryId: this.application.repositoryId,
        repositoryBranch: this.application.repositoryBranch,
        runScript: this.application.runScript,
        appName: this.application.appName,
        buildScript: this.application.buildScript,
        socketId: this.socket.id
      });
      this.isApplicationCreating = false;
    },
    applicationConfirm() {
      this.$snotify.confirm("Be careful, this can't be undone", 'Delete application?', {
        closeOnClick: false,
        backdrop: 0.3,
        type: 'error',
        bodyMaxLength: 250,
        titleMaxLength: 30,
        buttons: [
          {
            text: 'Yes',
            action: toast => {
              this.$snotify.remove(toast.id);
              this.deleteApplication();
            }
          },
          { text: 'No', action: toast => this.$snotify.remove(toast.id) }
        ]
      });
    },
    async deleteApplication() {
      try {
        this.isApplicationDeleting = true;
        await this.$axios.delete(
          `${process.env.VUE_APP_BACKEND_URL}/applications/${this.$route.params.id}`
        );
        this.$router.push('/node');
      } catch (error) {
        this.isApplicationDeleting = false;
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    }
  },
  async mounted() {
    const { data: application } = await this.$axios.get(
      `${process.env.VUE_APP_BACKEND_URL}/applications/${this.$route.params.id}`
    );
    this.application = application;
    this.socket = io(`${process.env.VUE_APP_BACKEND_URL}`);
  },
  beforeDestroy() {
    this.socket.destroy();
  }
};
</script>

<style lang="scss" scoped></style>

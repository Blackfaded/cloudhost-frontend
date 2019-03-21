<template>
  <b-container fluid v-if="application">
    <b-row>
      <b-col cols="12">
        <application-details :application="application"></application-details>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <container-logs :appName="application.appName"></container-logs> </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <base-box>
          <h3 slot="header">Danger Zone</h3>
          <base-button @click="applicationConfirm" variant="danger" slot="body"
            >Delete Application</base-button
          >
        </base-box>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ApplicationDetails from '@/components/boxes/ApplicationDetails';
import ContainerLogs from '@/components/boxes/ContainerLogs';
import BaseBox from '@/components/boxes/BaseBox';

export default {
  data() {
    return {
      application: null
    };
  },
  components: {
    ApplicationDetails,
    ContainerLogs,
    BaseBox
  },
  methods: {
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
        await this.$axios.delete(
          `${process.env.VUE_APP_BACKEND_URL}/applications/${this.$route.params.id}`
        );
        this.$router.push('/node');
      } catch (error) {
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
    console.log(application);
    this.application = application;
  }
};
</script>

<style lang="scss" scoped></style>

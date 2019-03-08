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
          <base-button variant="danger" slot="body">Delete Application</base-button>
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

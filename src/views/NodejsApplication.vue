<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12"> <application-details></application-details> </b-col>
    </b-row>
    <b-row>
      <b-col cols="12"> <container-logs></container-logs> </b-col>
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
      remember: false
    };
  },
  components: {
    ApplicationDetails,
    ContainerLogs,
    BaseBox
  }
};
</script>

<style lang="scss" scoped></style>
import EventBus from '@/bus';

export default {
  methods: {
    // eslint-disable-next-line
    async createApplication({
      repositoryName,
      repositoryId,
      repositoryBranch,
      runScript,
      appName,
      buildScript,
      socketId
    }) {
      try {
        const options = {
          repositoryName,
          repositoryId,
          repositoryBranch,
          runScript,
          appName,
          buildScript,
          socketId
        };
        // post data to api
        const { data: application } = await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/applications`,
          options
        );

        // emit event when app was created to update data in other components
        EventBus.$emit('applicationCreated', application);
        return application;
      } catch (error) {
        // display toast when an error occurs
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    }
  }
};

<template>
  <b-container fluid class="dashboardContainer">
    <b-row>
      <b-col cols="12">
        <h1>Herzlich Willkommen im Cloudhost</h1>

        <base-box>
          <h3 slot="header">Applications</h3>
          <template slot="body">
            <div>You have ({{ applications.length }}) application(s) hosted.</div>
            <div>({{ runningApplications.length }}) of them are currently running.</div>
          </template>
        </base-box>

        <hr />

        <base-box>
          <h3 slot="header">Database</h3>
          <template slot="body">
            <div v-if="mongoConnectionString.length">
              Your database is running. For more information look at the
              <a href="/mongo">MongoDB</a> tab in the navigation.
            </div>
            <div v-else>
              You don't have your database set up yet. For more information look at the
              <a href="/mongo">MongoDB</a> tab in the navigation.
            </div>
          </template>
        </base-box>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BaseBox from '@/components/boxes/BaseBox';

export default {
  components: {
    BaseBox
  },
  data() {
    return {
      applications: [],
      mongoConnectionString: ''
    };
  },
  methods: {
    // get database connection string to check if db is available
    async getDatabaseConnectionString() {
      try {
        const {
          data: { connectionString }
        } = await this.$axios.get('/database');

        // set connectionstring in component
        this.mongoConnectionString = connectionString;
      } catch (error) {
        // display toast if an error occurs
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    }
  },
  computed: {
    // filter all running applications
    runningApplications() {
      return this.applications.filter(application => application.running);
    }
  },
  async mounted() {
    // get all applications when component is mounted
    const { data: applications } = await this.$axios.get('/applications');
    this.applications = applications;

    // get db connection string when component is mounted
    await this.getDatabaseConnectionString();
  }
};
</script>
<style lang="scss" scoped>
.dashboardContainer {
  .test {
    background-color: #fff;
    padding: 30px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
    }
  }
}
</style>

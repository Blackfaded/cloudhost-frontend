<template>
  <div>
    <template v-if="!mongoConnectionString">
      <base-button @click="createDatabase">Create Database</base-button>
    </template>

    <template v-else>
      <base-box>
        <h3 slot="header">MongoDB</h3>

        <template slot="body">
          <h5>Use this string to connect to your database:</h5>
          <code>{{ mongoConnectionString }}</code>
          <h5>Example:</h5>
          <code>{{ `mongodb://${mongoConnectionString}/test` }}</code> <br />
        </template>

        <a
          :href="`mongo/${$store.state.user.userName}`"
          target="_blank"
          slot="footer"
          class="footer"
        >
          <base-button>Graphical UI</base-button>
        </a>
      </base-box>

      <br />

      <base-box>
        <h3 slot="header">Danger Zone</h3>
        <base-button slot="body" variant="danger" @click="deleteConfirm"
          >Delete Database</base-button
        >
      </base-box>
    </template>
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton';
import BaseBox from '@/components/boxes/BaseBox';

export default {
  components: {
    BaseButton,
    BaseBox
  },
  data() {
    return {
      mongoConnectionString: ''
    };
  },
  methods: {
    async getDatabaseConnectionString() {
      try {
        const {
          data: { connectionString }
        } = await this.$axios.get(`${process.env.VUE_APP_BACKEND_URL}/database`);
        this.mongoConnectionString = connectionString;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },
    async createDatabase() {
      const {
        data: { connectionString }
      } = await this.$axios.post(`${process.env.VUE_APP_BACKEND_URL}/database`);
      this.mongoConnectionString = connectionString;
    },
    async deleteDatabase() {
      const {
        data: { connectionString }
      } = await this.$axios.delete(`${process.env.VUE_APP_BACKEND_URL}/database`);
      this.mongoConnectionString = connectionString;
    },
    deleteConfirm() {
      this.$snotify.confirm(
        "Be careful, this can't be undone. All data will be lost.",
        'Delete database?',
        {
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
                this.deleteDatabase();
              }
            },
            { text: 'No', action: toast => this.$snotify.remove(toast.id) }
          ]
        }
      );
    }
  },
  async mounted() {
    await this.getDatabaseConnectionString();
  }
};
</script>

<style lang="scss" scoped>
.footer {
  button {
    margin: 20px 0;
  }
}
</style>

<template>
  <b-container fluid>
    <template v-if="!mongoConnectionString">
      <div class="text">
        To use a database you must first create one. After creation you get all the information
        needed to connect to your database.
      </div>

      <base-button v-if="!creatingDatabase" @click="createDatabase">Create Database</base-button>
      <base-button v-else disabled>Creating Database...</base-button>
    </template>

    <template v-else>
      <base-box>
        <h3 slot="header">MongoDB</h3>

        <template slot="body">
          <h5>Use this string to connect to your database:</h5>
          <code>{{ mongoConnectionString }}</code>
          <h5>Example:</h5>
          <code>{{ `mongodb://${mongoConnectionString}/test` }}</code> <br />
          <p>
            In this example you would connect to a collection named <code>test</code>. To create a
            new collection just name it after the last <code>/</code>.
          </p>
          <p>
            You only have one database instance, but you can create as many collections in it to use
            for multiple projects.
          </p>
        </template>

        <a
          :href="`mongo/${$store.state.user.userName}`"
          target="_blank"
          slot="footer"
          class="footer"
        >
          <base-button :disabled="deletingDatabase">Graphical UI</base-button>
        </a>
      </base-box>

      <br />

      <base-box>
        <h3 slot="header">Danger Zone</h3>
        <base-button
          slot="body"
          variant="danger"
          @click="deleteConfirm"
          :disabled="deletingDatabase"
          >Delete Database</base-button
        >
      </base-box>
    </template>
  </b-container>
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
      creatingDatabase: false,
      deletingDatabase: false,
      mongoConnectionString: ''
    };
  },
  methods: {
    // get database connection string to see if user has a db running
    async getDatabaseConnectionString() {
      try {
        const {
          data: { connectionString }
        } = await this.$axios.get('/database');
        this.mongoConnectionString = connectionString;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },

    // create user database
    async createDatabase() {
      try {
        this.creatingDatabase = true;
        const {
          data: { connectionString }
        } = await this.$axios.post('/database');
        this.mongoConnectionString = connectionString;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      } finally {
        this.creatingDatabase = false;
      }
    },

    // delete users database
    async deleteDatabase() {
      try {
        this.deletingDatabase = true;
        const {
          data: { connectionString }
        } = await this.$axios.delete('/database');
        this.mongoConnectionString = connectionString;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      } finally {
        this.deletingDatabase = false;
      }
    },

    // display confirm toast when user wants to delete database
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
    // when components gets mounted get db string
    await this.getDatabaseConnectionString();
  }
};
</script>

<style lang="scss" scoped>
.text {
  margin-bottom: 20px;
}
.footer {
  button {
    margin: 20px 0;
  }
}
</style>

<template>
  <b-container fluid class="usersContainer">
    <user-overview
      :users="preparedUsers"
      :fields="fields"
      @updateUserData="updateUserData"
      @toggleRole="toggleRole"
    ></user-overview>
  </b-container>
</template>
<script>
import UserOverview from '@/components/boxes/admin/UserOverview';

export default {
  components: {
    UserOverview
  },
  data() {
    return {
      users: [],
      fields: [
        {
          key: 'email',
          sortable: true
        },
        {
          key: 'active',
          sortable: true
        },
        {
          key: 'admin',
          sortable: true
        }
      ]
    };
  },
  methods: {
    // update userslist when an edited user is send back from api
    replaceUserinList(updatedUser) {
      this.users = this.users.map(user => {
        if (updatedUser.email === user.email) {
          return updatedUser;
        }
        return user;
      });
    },

    // patch userdata in backend
    async updateUserData({ user, key, value }) {
      try {
        const { data: updatedUser } = await this.$axios.patch(`users/${user}`, {
          [key]: value
        });
        // after request update userlist
        this.replaceUserinList(updatedUser);
      } catch (error) {
        // if en arror occurs display toast
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },

    // helperfunction for toggling userRole
    toggleRole({ user, role, value }) {
      if (value) {
        this.addRole(user, role);
      } else {
        this.deleteRole(user, role);
      }
    },

    // delete userrole in backend
    async deleteRole(user, role) {
      try {
        const { data: updatedUser } = await this.$axios.delete(`users/${user}/roles/${role}`);
        // after request update userlist
        this.replaceUserinList(updatedUser);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },

    // add userrole in backend
    async addRole(user, role) {
      const { data: updatedUser } = await this.$axios.post(`users/${user}/roles`, {
        role
      });
      // after request update userlist
      this.replaceUserinList(updatedUser);
    }
  },

  computed: {
    // prepare users for displaying
    preparedUsers() {
      return this.users.map(user => ({
        email: user.email,
        active: user.active,
        admin: user.roles.some(role => role === 'admin')
      }));
    }
  },

  async mounted() {
    // get all users when component gets mounted
    const { data } = await this.$axios.get('users');
    this.users = data;
  }
};
</script>

<style lang="scss" scoped>
.usersContainer {
  a {
    color: inherit;
  }
  .headline {
    button {
      margin-left: 20px;
    }
  }
}
</style>

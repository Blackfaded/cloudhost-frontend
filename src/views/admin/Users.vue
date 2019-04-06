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
    replaceUserinList(updatedUser) {
      this.users = this.users.map(user => {
        if (updatedUser.email === user.email) {
          return updatedUser;
        }
        return user;
      });
    },
    async updateUserData({ user, key, value }) {
      try {
        const { data: updatedUser } = await this.$axios.patch(`users/${user}`, {
          [key]: value
        });
        this.replaceUserinList(updatedUser);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },
    toggleRole({ user, role, flag }) {
      if (!flag) {
        this.deleteRole(user, role);
      } else {
        this.addRole(user, role);
      }
    },
    async deleteRole(user, role) {
      try {
        const { data: updatedUser } = await this.$axios.delete(`users/${user}/roles/${role}`);
        this.replaceUserinList(updatedUser);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },
    async addRole(user, role) {
      const { data: updatedUser } = await this.$axios.post(`users/${user}/roles`, {
        role
      });
      this.replaceUserinList(updatedUser);
    }
  },
  computed: {
    preparedUsers() {
      return this.users.map(user => ({
        email: user.email,
        active: user.active,
        admin: user.roles.some(role => role === 'admin')
      }));
    }
  },
  async mounted() {
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

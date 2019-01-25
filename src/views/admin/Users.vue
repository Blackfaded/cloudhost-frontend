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
      const { data: updatedUser } = await this.$axios.patch(
        `api/v1/users/${user}`,
        { [key]: value },
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.auth.token}`
          }
        }
      );
      this.replaceUserinList(updatedUser);
    },
    toggleRole({ user, role, flag }) {
      console.log(user, role, flag);
      if (!flag) {
        this.deleteRole(user, role);
      } else {
        this.addRole(user, role);
      }
    },
    async deleteRole(user, role) {
      const { data: updatedUser } = await this.$axios.delete(`api/v1/users/${user}/roles/${role}`, {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.auth.token}`
        }
      });
      this.replaceUserinList(updatedUser);
    },
    async addRole(user, role) {
      const { data: updatedUser } = await this.$axios.post(
        `api/v1/users/${user}/roles`,
        {
          role
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.auth.token}`
          }
        }
      );
      this.replaceUserinList(updatedUser);
    }
  },
  computed: {
    preparedUsers() {
      return this.users.map(user => ({
        email: user.email,
        active: user.active,
        admin: user.roles.some(role => role.name === 'admin')
      }));
    }
  },
  async mounted() {
    const { data } = await this.$axios.get('api/v1/users', {
      headers: {
        Authorization: `Bearer ${this.$store.state.user.auth.token}`
      }
    });
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

<template>
  <base-box class="userEdit">
    <h5 slot="header">Details for user {{ user.email }}</h5>

    <div slot="body">
      <table>
        <tbody>
          <tr>
            <td>Gitlab ID</td>
            <td>{{ user.gitlabId }}</td>
          </tr>
          <tr>
            <td>E-Mail</td>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{{ user.username }}</td>
          </tr>
          <tr>
            <td>Has Mongo DB</td>
            <td><b-form-checkbox v-model="user.hasMongoDB" disabled></b-form-checkbox></td>
          </tr>
          <tr>
            <td>Active</td>
            <td><b-form-checkbox v-model="user.active" disabled></b-form-checkbox></td>
          </tr>
          <tr>
            <td>Admin</td>
            <td><b-form-checkbox v-model="isAdmin" disabled></b-form-checkbox></td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>{{ formatDate(user.createdAt) }}</td>
          </tr>
          <tr>
            <td>Last Login</td>
            <td>{{ formatDate(user.lastLogin) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </base-box>
</template>

<script>
import BaseBox from '@/components/boxes/BaseBox';

export default {
  components: {
    BaseBox
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    update: {
      type: Function,
      required: true
    }
  },
  computed: {
    isAdmin: {
      get() {
        return this.user.roles.some(role => role === 'admin');
      },
      set() {}
    }
  },
  methods: {
    formatDate(date) {
      return `${new Date(date).toDateString()} - ${new Date(date).toTimeString()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.userEdit {
  table {
    border-collapse: separate;
    border-spacing: 20px 0;
    tbody {
      tr {
        td {
          &:first-child {
            text-align: right;
            font-weight: bold;
          }
        }
      }
    }
  }
  h5 {
    margin: 0;
  }
}
</style>

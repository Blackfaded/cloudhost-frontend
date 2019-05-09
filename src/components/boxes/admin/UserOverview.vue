<template>
  <base-box class="adminUserOverview">
    <h2 slot="header" class="headline">Usermanagement</h2>

    <div slot="body">
      <b-table striped hover :items="users" :fields="fields">
        <template slot="email" slot-scope="data">
          <router-link :to="`/admin/users/${data.item.email}`">{{ data.item.email }}</router-link>
        </template>
        <template slot="active" slot-scope="data">
          <div @click="updateUserData(data.item.email, 'active', !data.item.active)">
            <font-awesome-icon
              :style="booleanIconStyle(data.item.active)"
              :icon="data.item.active ? 'check-circle' : 'times-circle'"
            />
          </div>
        </template>
        <template slot="admin" slot-scope="data">
          <div @click="toggleRole(data.item.email, 'admin', !data.item.admin)">
            <font-awesome-icon
              :style="booleanIconStyle(data.item.admin)"
              :icon="data.item.admin ? 'check-circle' : 'times-circle'"
            />
          </div>
        </template>
      </b-table>
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
    users: {
      type: Array
    },
    fields: {
      type: Array
    }
  },
  methods: {
    // return color of label based und a boolean value
    booleanIconStyle(bool) {
      return {
        color: bool ? 'var(--success)' : 'var(--danger)'
      };
    },

    // emit event to update user to the components parent
    updateUserData(user, key, value) {
      this.$emit('updateUserData', { user, key, value });
    },

    // emit event to update users role to the components parent
    toggleRole(user, role, value) {
      this.$emit('toggleRole', { user, role, value });
    }
  }
};
</script>

<style lang="scss" scoped>
.adminUserOverview {
}
</style>

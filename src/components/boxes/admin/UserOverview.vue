<template>
  <base-box class="adminUserOverview">
    <h2 slot="header" class="headline">Usermanagement</h2>

    <div slot="body">
      <b-table striped hover :items="items" :fields="fields">
        <template slot="e-mail" slot-scope="data">
          <router-link :to="`/admin/users/${data.item['e-mail']}`">
            {{ data.item['e-mail'] }}
          </router-link>
        </template>
        <template slot="admin" slot-scope="data">
          <font-awesome-icon
            :style="booleanIconStyle(data.item.admin)"
            :icon="data.item.admin ? 'check-circle' : 'times-circle'"
          />
        </template>
        <template slot="active" slot-scope="data">
          <font-awesome-icon
            :style="booleanIconStyle(data.item.active)"
            :icon="data.item.active ? 'check-circle' : 'times-circle'"
          />
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
    items: {
      type: Array
    },
    fields: {
      type: Array
    }
  },
  methods: {
    booleanIconStyle(bool) {
      return {
        color: bool ? 'var(--success)' : 'var(--danger)'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.adminUserOverview {
}
</style>

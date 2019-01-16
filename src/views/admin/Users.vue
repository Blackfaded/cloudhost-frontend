<template>
  <b-container fluid class="usersContainer">
    <h2 class="headline">Usermanagement</h2>
    <b-table striped hover :items="testItems" :fields="fields">
      <template slot="e-mail" slot-scope="data">
        <router-link :to="`/admin/users/${data.item['e-mail']}`">{{
          data.item['e-mail']
        }}</router-link>
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
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          'e-mail': 'test@test.de',
          active: true,
          admin: false
        }
      ],
      fields: [
        {
          key: 'e-mail',
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
  computed: {
    testItems() {
      return Array.from(Array(10)).map(() => ({
        ...this.items[0],
        active: Math.floor(Math.random() * 2),
        admin: Math.floor(Math.random() * 2)
      }));
    }
  },
  methods: {
    booleanIconStyle(bool) {
      return {
        color: bool ? 'green' : 'red'
      };
    }
  },
  mounted() {
    console.log('users');
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

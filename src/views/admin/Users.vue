<template>
  <b-container fluid class="usersContainer">
    <user-overview :items="testItems" :fields="fields"></user-overview>
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

<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12"> <user-edit v-if="user" :user="user" :update="update"></user-edit> </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UserEdit from '@/components/boxes/admin/UserEdit';

export default {
  components: {
    UserEdit
  },
  data() {
    return {
      user: null
    };
  },
  computed: {
    userName() {
      return this.$route.params.id;
    }
  },
  methods: {
    async update(updateData) {
      const { data: user } = await this.$axios.patch(`/users/${this.userName}`, updateData);
      this.user = user;
    }
  },
  async mounted() {
    const { data: user } = await this.$axios.get(`/users/${this.userName}`);
    this.user = user;
  }
};
</script>

<style lang="scss" scoped>
.headline {
  button {
    margin-left: 20px;
  }
}
</style>

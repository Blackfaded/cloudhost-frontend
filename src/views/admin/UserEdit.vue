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
    // get username from routeparams (users/:id)
    userName() {
      return this.$route.params.id;
    }
  },
  methods: {
    async update(updateData) {
      // patch userdata in backend
      const { data: user } = await this.$axios.patch(`/users/${this.userName}`, updateData);
      this.user = user;
    }
  },
  async mounted() {
    // get userdata when components is mounted
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

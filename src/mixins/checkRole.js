export default {
  methods: {
    checkRole(role) {
      return this.$store.state.user.roles.find(roleName => role === roleName);
    }
  }
};

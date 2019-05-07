export default {
  methods: {
    // check if user has a given role by string
    checkRole(role) {
      return this.$store.state.user.roles.find(roleName => role === roleName);
    }
  }
};

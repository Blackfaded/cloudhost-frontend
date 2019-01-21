<template>
  <b-container class="loginContainer"></b-container>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['setToken', 'destroyToken']),
    reject() {
      this.$router.push('/auth');
    }
  },
  async mounted() {
    const params = window.location.hash.substr(1).split('&');
    const paramsObj = {};
    params.forEach(param => {
      const [key, value] = param.split('=');
      paramsObj[key] = value;
    });
    // get jwt from server
    if (paramsObj.access_token) {
      try {
        const {
          data: { token }
        } = await this.$axios.post('/auth', {
          accessToken: paramsObj.access_token
        });
        this.setToken(token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.reject();
      }
    } else {
      this.reject();
    }
  }
};
</script>

<style lang="scss" scoped>
.loginContainer {
}
</style>

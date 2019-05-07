<template>
  <base-box class="settingsBox">
    <div slot="body" class="body">
      <div class="profilePicture"><img :src="profilePicture" alt="Profile Picture" /></div>
      <h5>{{ userName }}</h5>
    </div>
    <div slot="footer" class="footer">
      <theme-switch></theme-switch>
      <base-button @click="logout" variant="primary">Logout</base-button>
    </div>
  </base-box>
</template>

<script>
import { mapActions } from 'vuex';
import PersonPlaceholder from '@/assets/img/person-placeholder.jpg';
import BaseBox from './BaseBox';
import ThemeSwitch from '@/components/switches/ThemeSwitch';

export default {
  data() {
    return {
      PersonPlaceholder
    };
  },
  components: {
    BaseBox,
    ThemeSwitch
  },
  computed: {
    profilePicture() {
      return this.$store.state.user.profilePictureUrl || this.PersonPlaceholder;
    },
    userName() {
      return this.$store.state.user.name;
    }
  },
  methods: {
    ...mapActions(['destroyToken']),

    // destroy User token on logout and redirect to /
    logout() {
      this.destroyToken();
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.settingsBox {
  .body {
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .profilePicture {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>

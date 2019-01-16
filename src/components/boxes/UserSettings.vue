<template>
  <base-box class="settingsBox">
    <div slot="body" class="body">
      <div class="profilePicture"><img :src="PersonPlaceholder" alt="Profile Picture" /></div>
      <h5>René Heinen</h5>
    </div>
    <div slot="footer" class="footer">
      <b-button @click="$router.push('/')" variant="primary">Logout</b-button>
    </div>
  </base-box>
</template>

<script>
import BaseBox from './BaseBox';
import PersonPlaceholder from '@/assets/img/person-placeholder.jpg';

export default {
  data() {
    return {
      PersonPlaceholder
    };
  },

  components: {
    BaseBox
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
    justify-content: center;
    align-items: center;
  }
}
</style>

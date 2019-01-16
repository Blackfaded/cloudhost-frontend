<template>
  <base-box class="applicationBox">
    <div slot="header" class="header">
      <a href="dsdf">sdfsfsdf</a>
      <div class="icons">
        <router-link to="/node/1234"> <font-awesome-icon icon="cogs" /> </router-link>
      </div>
    </div>
    <div slot="body">
      <div>Reponame: myTemplate</div>
      <div>Branch: master</div>
    </div>
    <div slot="footer" class="footer">
      <toggle-button
        class="toggle"
        v-model="running"
        :labels="{
          checked: pending ? 'Starting...' : 'Running',
          unchecked: pending ? 'Stopping...' : 'Stopped'
        }"
        :color="{
          checked: pending ? '#ec971f' : '#3d9970',
          unchecked: pending ? '#ec971f' : '#c82333'
        }"
        :width="100"
        :height="30"
        :disabled="pending"
        @change="statusChange"
      />
    </div>
  </base-box>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button';
import BaseBox from './BaseBox';

export default {
  data() {
    return {
      running: false,
      pending: false
    };
  },

  components: {
    BaseBox,
    ToggleButton
  },
  methods: {
    statusChange() {
      this.pending = true;
      setTimeout(() => {
        this.pending = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.applicationBox {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: inherit;
    }
  }
  .footer {
    .toggle {
      margin: 0;
    }
  }
}
</style>

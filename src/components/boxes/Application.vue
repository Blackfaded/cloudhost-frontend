<template>
  <base-box class="applicationBox">
    <div slot="header" class="header">
      <a :href="applicationLink" target="_blank">{{ application.appName }}</a>
      <div class="icons">
        <router-link to="/node/1234"> <font-awesome-icon icon="cogs" /> </router-link>
      </div>
    </div>
    <div slot="body">
      <div>Repository: {{ application.repositoryName }}</div>
      <div>Branch: {{ application.repositoryBranch }}</div>
    </div>
    <div slot="footer" class="footer">
      <application-switch
        @change="stateChange"
        :running="running"
        :pending="pending"
      ></application-switch>
    </div>
  </base-box>
</template>

<script>
import ApplicationSwitch from '@/components/switches/ApplicationSwitch';
import BaseBox from './BaseBox';

export default {
  components: {
    BaseBox,
    ApplicationSwitch
  },
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      pending: false,
      running: this.application.autostart
    };
  },

  methods: {
    async stateChange({ value }) {
      const oldValue = !value;
      this.running = value;
      this.pending = true;
      try {
        await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_URL}api/v1/applications/${this.application.appName}/${
            value ? 'start' : 'stop'
          }`
        );
      } catch (error) {
        this.running = oldValue;
        console.log({ error });
      }

      console.log(this.running);
      this.pending = false;
    }
  },
  computed: {
    applicationLink() {
      return `${process.env.VUE_APP_DOMAIN}/${this.application.mountPath}/`;
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

<template>
  <base-box :maxHeight="500">
    <h3 slot="header">Container Logs</h3>

    <div slot="body">
      <pre v-highlightjs="logs"><code class="shell-session"></code></pre>
    </div>
  </base-box>
</template>

<script>
import io from 'socket.io-client';

import BaseBox from './BaseBox';

export default {
  data() {
    return {
      socket: null,
      logs: ''
    };
  },

  components: {
    BaseBox
  },
  props: {
    appName: {
      type: String,
      required: true
    }
  },
  methods: {
    logsReceived(logs) {
      this.logs += logs;
      console.log(logs);
    }
  },
  mounted() {
    this.socket = io(`${process.env.VUE_APP_BACKEND_URL}/logs`);
    this.socket.emit('getLogs', {
      userName: this.$store.state.user.userName,
      appName: this.appName,
      jwt: this.$store.state.auth.token
    });
    this.socket.on('logs', this.logsReceived);
  }
};
</script>

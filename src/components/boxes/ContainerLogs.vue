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
import * as Cookies from 'js-cookie';

import BaseBox from './BaseBox';

export default {
  components: {
    BaseBox
  },
  props: {
    application: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      socket: null,
      logs: ''
    };
  },
  methods: {
    logsReceived(logs) {
      this.logs += logs;
    },
    connetSocket() {
      this.logs = '';
      this.socket = io(`${process.env.VUE_APP_BACKEND_URL}/logs`);
      this.socket.emit('getLogs', {
        appName: this.application.appName,
        token: Cookies.get('jwt')
      });
      this.socket.on('logs', this.logsReceived);
    }
  },
  mounted() {
    this.connetSocket();
  },
  beforeDestroy() {
    this.socket.disconnect();
  },
  watch: {
    application() {
      this.socket.disconnect();
      this.connetSocket();
    }
  }
};
</script>

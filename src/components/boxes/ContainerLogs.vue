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
    // handler for when the logs are received by client
    logsReceived(logs) {
      this.logs += logs;
    },

    // connection to the logs namespace with socket-io
    connetSocket() {
      this.logs = '';
      this.socket = io(`${process.env.VUE_APP_DOMAIN}/logs`, { path: '/api/socket.io' });

      // emit getLogs event to server with JWT as token to verify user in backend
      this.socket.emit('getLogs', {
        appName: this.application.appName,
        token: Cookies.get('jwt')
      });

      // add sockethandler when logs are received
      this.socket.on('logs', this.logsReceived);
    }
  },
  mounted() {
    // connect to socket when the component gets mounted
    this.connetSocket();
  },

  // disconnect to socket when the component gets destroyed
  beforeDestroy() {
    this.socket.disconnect();
  },
  watch: {
    // when the application prop changes reconnect socket to receive new logs from new application
    application() {
      this.socket.disconnect();
      this.connetSocket();
    }
  }
};
</script>

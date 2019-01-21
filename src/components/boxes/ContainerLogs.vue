<template>
  <base-box :maxHeight="500">
    <h3 slot="header">Container Logs</h3>

    <div slot="body">
      <pre v-highlightjs="logs"><code class="shell-session"></code></pre>
    </div>
  </base-box>
</template>

<script>
import BaseBox from './BaseBox';

export default {
  data() {
    return {
      logs: `> demo@0.0.0 start /app
> node ./bin/www


> demo@0.0.0 start /app
> node ./bin/www

GET / 200 2558.978 ms - 170
GET / 304 28.012 ms - -

> demo@0.0.0 start /app
> node ./bin/www

GET / 200 5606.509 ms - 170
GET / 304 216.567 ms - -
GET / 200 21.243 ms - 170

> demo@0.0.0 start /app
> node ./bin/www


> demo@0.0.0 start /app
> node ./bin/www

GET / 200 2372.817 ms - 170

> demo@0.0.0 start /app
> node ./bin/www

GET / 200 3397.882 ms - 170
GET / 200 22.115 ms - 170
GET / 304 19.164 ms - -
GET /index 404 26.315 ms - 862
GET /index.html 404 25.948 ms - 862
GET / 304 15.308 ms - -
GET / 304 18.208 ms - -

> demo@0.0.0 start /app
> node ./bin/www


> demo@0.0.0 start /app
> node ./bin/www


> demo@0.0.0 start /app
> node ./bin/www
`
    };
  },

  components: {
    BaseBox
  }
};
</script>

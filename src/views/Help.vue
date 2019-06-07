<template>
  <b-container fluid class="helpContainer">
    <h3>Getting started</h3>
    <p>
      Cloudhost enables you to create node.js applications and a mongoDB that you can host in the
      cloud.
    </p>
    <hr />
    <h3>Creating your database</h3>
    <p>
      If your application relies on a database you first must create one under the
      <router-link to="/mongo">mongoDB</router-link>
      tab in the navigation. After creating follow the example to setup your database in your
      project.
    </p>
    <p>
      You only have one database instance, but you can create as many collections as you want to use
      for multiple projects.
    </p>
    <hr />
    <h3>Creating an application</h3>
    <div>
      You can create as many applications as you want under the
      <router-link to="/node">Node.js</router-link>tab in the navigation. To create one follow these
      steps:
      <ul>
        <li>click on the <code>new</code> button</li>
        <li>
          select one of your repositories (hosted on
          <a target="_blank" href="http://git.hsrw.eu">git.hsrw.eu</a>)
        </li>
        <li>select a branch you want to host</li>
        <li>select the runscript from the <code>package.json</code> file.</li>
        <li>
          <div>
            (optional): select a buildscript which needs to run before your application is started.
          </div>
          <div>
            For example if you need to build your SPA frontend files (like angular, react, vue).
          </div>
        </li>
      </ul>
    </div>

    <div>
      To get your assets and scriptfiles being loaded correctly you must set the basepath in your
      application to <code>''</code>.
    </div>
    <div>In most cases the default value for the basepath is <code>'/'</code></div>
    <hr />
    <p>Example project which hosts your build files from a <code>dist</code> folder:</p>
    <p>
      Here your app was built and packed into a <code>dist</code> folder. Your server then serves
      the bundled app from that <code>dist</code> folder.
    </p>

    <code>Server.js</code>

    <div>
      <pre v-highlightjs="serverExample"><code class="javascript"></code></pre>
    </div>

    <code>package.json</code>

    <div>
      <pre v-highlightjs="pjExample"><code class="json"></code></pre>
    </div>

    <img class="exampleImage" :src="exampleImage" alt="Example Image" />

    <p>
      A complete example application can be found at
      <a target="_blank" href="https://git.hsrw.eu/rene.heinen/angular-example-app">git.hsrw.eu</a>
    </p>
    <p>
      Take a look at the <code>outputPath</code> in the <code>angular.json</code> and the
      <code>base</code> tag in the <code>src/index.html</code>
    </p>
  </b-container>
</template>
<script>
import exampleImage from '@/assets/img/createApplicationExample.png';

export default {
  data() {
    return {
      exampleImage,
      serverExample:
        "const http = require('http');\n" +
        "const express = require('express');\n" +
        "const path = require('path');\n" +
        'const app = express();\n' +
        "app.use('/', express.static(path.join(__dirname, './dist')));\n" +
        'const server = http.createServer(app);;\n' +
        "server.listen('8080');\n" +
        "console.log('Server started');\n",

      pjExample:
        '"scripts": {\n' +
        '    "ng": "ng",\n' +
        '    "start": "ng serve",\n' +
        '    "build": "ng build",\n' +
        '    "test": "ng test",\n' +
        '    "lint": "ng lint",\n' +
        '    "e2e": "ng e2e",\n' +
        '    "startServer": "node ./server/index.js"\n' +
        '}'
    };
  }
};
</script>

<style lang="scss" scoped>
.exampleImage {
  max-width: 100%;
  margin: 10px 0;
}
</style>

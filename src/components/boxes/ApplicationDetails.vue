<template>
  <base-box class="applicationDetails">
    <h3 slot="header">Application Details</h3>

    <div slot="body">
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>1234</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>dgfddgfdfgdfg</td>
          </tr>
          <tr>
            <td>Available at</td>
            <td>/hsrw.org/rene.heinen/dgfddgfdfgdfg/</td>
          </tr>
          <tr>
            <td>Repository Name</td>
            <td>myTemplate</td>
          </tr>
          <tr>
            <td>Repository Branch</td>
            <td>master</td>
          </tr>
          <tr>
            <td>Deployed Commit hash</td>
            <td>9962b010</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>2 months ago</td>
          </tr>
          <tr>
            <td>Mongo Connection</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <application-switch :applicationName="application.appName"></application-switch>
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
  }
};
</script>

<style lang="scss" scoped>
.applicationDetails {
  table {
    border-collapse: separate;
    border-spacing: 20px 0;
    tbody {
      tr {
        td {
          &:first-child {
            text-align: right;
            font-weight: bold;
          }
        }
      }
    }
  }

  .toggle {
    margin: 0;
  }
}
</style>

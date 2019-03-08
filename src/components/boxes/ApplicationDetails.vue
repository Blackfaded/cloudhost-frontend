<template>
  <base-box class="applicationDetails">
    <h3 slot="header">Application Details</h3>

    <div slot="body">
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{{ application.appName }}</td>
          </tr>
          <tr>
            <td>Available at</td>
            <td>
              <a :href="applicationLink" target="_blank"> {{ applicationLink }}</a>
            </td>
          </tr>
          <tr>
            <td>Repository Name</td>
            <td>{{ application.repositoryName }}</td>
          </tr>
          <tr>
            <td>Repository Branch</td>
            <td>{{ application.repositoryBranch }}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{{ application.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer"><application-switch :application="application"></application-switch></div>
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
  computed: {
    applicationLink() {
      return `${process.env.VUE_APP_DOMAIN}/${this.application.mountPath}/`;
    }
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

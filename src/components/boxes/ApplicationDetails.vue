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
            <td>{{ formattedDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <application-switch :disabled="isApplicationDeleting" :application="application">
      </application-switch>
      <base-button
        v-b-tooltip.hover
        title="Your app gets recreated from the newest commit on that given repository and branch."
        class="recreateButton"
        :disabled="isApplicationDeleting"
        @click="checkApplicationCreate"
        >recreate</base-button
      >
    </div>
  </base-box>
</template>

<script>
import ApplicationSwitch from '@/components/switches/ApplicationSwitch';
import BaseBox from './BaseBox';
import BaseButton from '@/components/buttons/BaseButton';

export default {
  components: {
    BaseBox,
    ApplicationSwitch,
    BaseButton
  },
  props: {
    application: {
      type: Object,
      required: true
    },
    checkApplicationCreate: {
      type: Function,
      required: true
    },
    isApplicationDeleting: {
      type: Boolean
    }
  },
  computed: {
    // calculate application link
    applicationLink() {
      return `${process.env.VUE_APP_DOMAIN}/${this.application.mountPath}/`;
    },

    // format date
    formattedDate() {
      return `${new Date(this.application.createdAt).toLocaleDateString()} - ${new Date(
        this.application.createdAt
      ).toLocaleTimeString()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.applicationDetails {
  .recreateButton {
    margin-left: 20px;
  }
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

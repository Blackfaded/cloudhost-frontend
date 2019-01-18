<template>
  <base-box class="userEdit">
    <h5 slot="header">Edit User test@test.de</h5>

    <div slot="body">
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td><b-form-input value="1234"></b-form-input></td>
          </tr>
          <tr>
            <td>Gitlab ID</td>
            <td><b-form-input value="5"></b-form-input></td>
          </tr>
          <tr>
            <td>E-Mail</td>
            <td><b-form-input value="test@test.de"></b-form-input></td>
          </tr>
          <tr>
            <td>Active</td>
            <td><b-form-checkbox :value="true"></b-form-checkbox></td>
          </tr>
          <tr>
            <td>Admin</td>
            <td><b-form-checkbox :value="true"></b-form-checkbox></td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>2018-09-19T14:43:56.277Z</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer"><base-button variant="primary">Update User</base-button></div>
  </base-box>
</template>

<script>
import BaseBox from '@/components/boxes/BaseBox';

export default {
  components: {
    BaseBox
  }
};
</script>

<style lang="scss" scoped>
.userEdit {
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
  h5 {
    margin: 0;
  }
}
</style>

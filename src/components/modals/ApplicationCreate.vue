<template>
  <base-modal @close="close" class="applicationDetails">
    <h3 slot="header">Create Application</h3>

    <div slot="body">
      <h4>Base Configuration</h4>
      <div>Select a repository</div>
      <b-form-select value="a" class="mb-3">
        <option value="a">cloudhost / cloudhost-backend</option>
        <option value="b">cloudhost / cloudhost-frontend</option>
      </b-form-select>
      <div>Select a branch</div>
      <b-form-select value="a" class="mb-3">
        <option value="a">master</option> <option value="b">develop</option>
      </b-form-select>
      <div>Select a Run-Script</div>
      <b-form-select value="a" class="mb-3">
        <option value="a">start</option> <option value="b">dev</option>
      </b-form-select>
      <div>Select a Mount Path</div>
      <b-input-group size="sm">
        <b-input-group-text slot="prepend">
          <span>cloudhost.hsrw.eu/hsrw.org/rene.heinen/</span>
        </b-input-group-text>
        <b-form-input value="cloudhost-backend"></b-form-input>
      </b-input-group>
      <hr />
      <div>Additional Features</div>
      <b-form-checkbox>Attach Mongo DB</b-form-checkbox>
    </div>
    <div slot="footer" class="footer">
      <base-button variant="danger" @click="close">Cancel</base-button>
      <base-button variant="primary">Create Application</base-button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal';

export default {
  components: {
    BaseModal
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.applicationDetails {
  .box {
    width: 400px;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      margin-left: 10px;
    }
  }
}
</style>

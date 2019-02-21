<template>
  <base-modal @close="close" class="applicationDetails">
    <h3 slot="header">Create Application</h3>

    <template slot="body">
      <h4>Base Configuration</h4>
      <spinner v-if="loading" class="spinner"></spinner>
      <div v-else-if="!repositories.length">
        You do not have any repositories on <a href="https://www.git.hsrw.eu">www.git.hsrw.eu</a>
      </div>
      <template v-else>
        <div>Select a repository</div>
        <b-form-select :value="selectedRepository" @change="repositoryChange" class="mb-3">
          <option v-for="(repo, index) in repositories" :key="index" :value="repo">{{
            repo.path_with_namespace
          }}</option>
        </b-form-select>

        <template v-if="branches.length">
          <div>Select a branch</div>
          <b-form-select :value="selectedBranch" @change="branchChange" class="mb-3">
            <option v-for="(branch, index) in branches" :key="index" :value="branch">{{
              branch.name
            }}</option>
          </b-form-select>
        </template>

        <template v-if="runScripts.length">
          <div>Select a Run-Script</div>
          <b-form-select v-model="selectedRunScript" class="mb-3">
            <option v-for="(script, index) in runScripts" :key="index" :value="script">{{
              script
            }}</option>
          </b-form-select>
        </template>
        <template v-if="selectedRunScript">
          <div>Select a Mount Path</div>
          <b-input-group size="sm">
            <b-input-group-text slot="prepend">
              <span>{{ mountPath }}</span>
            </b-input-group-text>
            <b-form-input :value="this.selectedRepository.path"></b-form-input>
          </b-input-group>
        </template>
        <hr />
        <div>Additional Features</div>
        <b-form-checkbox>Attach Mongo DB</b-form-checkbox>
      </template>
    </template>
    <div slot="footer" class="footer">
      <base-button variant="danger" @click="close">Cancel</base-button>
      <base-button
        variant="primary"
        :disabled="isCreateApplicationButtonDisabled"
        @click="createApplication"
        >Create Application</base-button
      >
    </div>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal';
import Spinner from '@/components/loader/Spinner';

export default {
  components: {
    BaseModal,
    Spinner
  },
  props: {
    repositories: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedRepository: null,
      selectedBranch: null,
      selectedRunScript: null,
      branches: [],
      runScripts: []
    };
  },
  computed: {
    mountPath() {
      return `${process.env.VUE_APP_DOMAIN}/${this.$store.state.user.email.split('@')[0]}/`;
    },
    isCreateApplicationButtonDisabled() {
      return !this.selectedRepository || !this.selectedBranch || !this.selectedRunScript;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    reset() {
      this.branches = [];
      this.runScripts = [];
    },
    async createApplication() {
      console.log('create application');
      const { data } = await this.$axios.post(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/applications`,
        {
          repositoryId: this.selectedRepository.id,
          branchName: this.selectedBranch.name,
          runScript: this.selectedRunScript
        }
      );
      console.log(data);
    },
    async repositoryChange(repo) {
      this.selectedRepository = repo;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/repositories/${
          this.selectedRepository.id
        }/branches`
      );
      this.branches = data;
    },
    async branchChange(branch) {
      this.selectedBranch = branch;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/repositories/${
          this.selectedRepository.id
        }/branches/${this.selectedBranch.name}/runScripts`
      );
      this.runScripts = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.applicationDetails {
  .spinner {
    margin: 0 auto;
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

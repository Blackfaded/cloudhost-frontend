<template>
  <base-modal @close="close" maskdisabled class="applicationDetails">
    <h3 slot="header">Create Application</h3>

    <template v-if="!isApplicationCreating" slot="body">
      <spinner v-if="loading" class="spinner"></spinner>
      <div v-else-if="!repositories.length">
        You do not have any repositories on <a href="https://git.hsrw.eu">git.hsrw.eu</a>
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
              branch
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

        <template v-if="runScripts.length">
          <b-form-checkbox
            v-model="needsBuildScript"
            v-b-tooltip.hover
            title="This script gets executed before your application launches.
            For example if you need to build your frontend files."
          >
            Select a Build-Script (optional)
          </b-form-checkbox>

          <b-form-select v-if="needsBuildScript" v-model="selectedBuildScript" class="mb-3">
            <option v-for="(script, index) in runScripts" :key="index" :value="script">{{
              script
            }}</option>
          </b-form-select>
        </template>

        <template v-if="selectedRunScript">
          <div>Select a Mount Path</div>
          <b-input-group size="sm">
            <b-input-group-text slot="prepend">
              <span>{{ mountPathPrefix }}</span>
            </b-input-group-text>
            <b-form-input v-model="appName"></b-form-input>
          </b-input-group>
        </template>

        <spinner v-if="loadingRequest" class="spinner"></spinner>
      </template>
    </template>

    <progress-bars v-else slot="body" :socket="socket"></progress-bars>

    <div v-if="!isApplicationCreating" slot="footer" class="footer">
      <base-button variant="danger" @click="close">Cancel</base-button>
      <base-button
        variant="primary"
        :disabled="isCreateApplicationButtonDisabled"
        @click="checkApplicationCreate"
        >Create Application</base-button
      >
    </div>
  </base-modal>
</template>

<script>
import io from 'socket.io-client';

import BaseModal from './BaseModal';
import Spinner from '@/components/loader/Spinner';
import ProgressBars from '@/components/application/ProgressBars';
import createApplicationMixin from '@/mixins/createApplication';

export default {
  components: {
    BaseModal,
    Spinner,
    ProgressBars
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
  mixins: [createApplicationMixin],
  data() {
    return {
      needsBuildScript: false,
      selectedRepository: null,
      selectedBranch: null,
      selectedRunScript: null,
      selectedBuildScript: null,
      branches: [],
      runScripts: [],
      loadingRequest: false,
      appName: '',
      isApplicationCreating: false
    };
  },
  mounted() {
    this.socket = io(`${process.env.VUE_APP_DOMAIN}`, { path: '/api/socket.io' });
  },
  computed: {
    username() {
      return this.$store.state.user.email.split('@')[0];
    },
    mountPathPrefix() {
      return `${process.env.VUE_APP_DOMAIN}/${this.username}/`;
    },
    isCreateApplicationButtonDisabled() {
      return !this.selectedRepository || !this.selectedBranch || !this.selectedRunScript;
    }
  },
  methods: {
    reset() {
      this.runScripts = [];
      this.selectedBranch = null;
      this.selectedRunScript = null;
    },
    async doesApplicationAlreadyExist() {
      const { data: applications } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/applications/${this.appName}`
      );
      return !!applications;
    },
    async checkApplicationCreate() {
      if (await this.doesApplicationAlreadyExist()) {
        this.$snotify.error(
          'You already have an application under this path.',
          "Can't create application",
          {
            bodyMaxLength: 250,
            titleMaxLength: 30
          }
        );
      } else {
        this.createApplicationProcess();
      }
    },
    async createApplicationProcess() {
      try {
        this.isApplicationCreating = true;
        await this.createApplication({
          repositoryName: this.selectedRepository.path,
          repositoryId: this.selectedRepository.id,
          repositoryBranch: this.selectedBranch,
          runScript: this.selectedRunScript,
          appName: this.appName,
          buildScript: this.selectedBuildScript,
          socketId: this.socket.id
        });
        this.close();
      } catch (error) {
        this.isApplicationCreating = false;
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    },
    async repositoryChange(repo) {
      this.loadingRequest = true;
      this.selectedRepository = repo;
      this.appName = this.selectedRepository.path;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/repositories/${this.selectedRepository.id}/branches`
      );
      this.branches = data;
      this.runScripts = [];
      this.needsBuildScript = false;
      this.selectedBuildScript = null;
      this.loadingRequest = false;
    },
    async branchChange(branch) {
      this.loadingRequest = true;
      this.selectedBranch = branch;
      this.runScripts = [];
      this.selectedRunScript = null;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/repositories/${this.selectedRepository.id}/branches/${
          this.selectedBranch
        }/runScripts`
      );
      this.runScripts = data;
      this.loadingRequest = false;
    },
    close() {
      this.$emit('close');
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

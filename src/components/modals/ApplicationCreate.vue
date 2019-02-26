<template>
  <base-modal @close="close" maskdisabled class="applicationDetails">
    <h3 slot="header">Create Application</h3>

    <template v-if="!isApplicationCreating" slot="body">
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
              <span>{{ mountPathPrefix }}</span>
            </b-input-group-text>
            <b-form-input v-model="appName"></b-form-input>
          </b-input-group>
        </template>

        <spinner v-if="loadingRequest" class="spinner"></spinner>

        <hr />
        <div>Additional Features</div>
        <b-form-checkbox v-model="needsMongo">Attach Mongo DB</b-form-checkbox>
      </template>
    </template>
    <template v-else slot="body">
      <div class="bars">
        <div class="bar" v-for="(bar, barName, index) in shownProgressBars" :key="index">
          <span class="step"> Step {{ index + 1 }}/{{ Object.keys(progressBars).length }} </span>
          <progress-bar
            :noProgress="bar.noProgress"
            :progress="bar.progress"
            :finished="bar.finished"
            :started="bar.started"
          >
            <div>{{ bar.text }}</div>
          </progress-bar>
        </div>
      </div>
    </template>

    <div slot="footer" class="footer">
      <template v-if="!isApplicationCreating">
        <base-button variant="danger" @click="close">Cancel</base-button>
        <base-button
          variant="primary"
          :disabled="isCreateApplicationButtonDisabled"
          @click="checkApplicationCreate"
          >Create Application</base-button
        >
      </template>
      <base-button v-else :disabled="!applicationCreated" @click="close" variant="primary"
        >Done</base-button
      >
    </div>
  </base-modal>
</template>

<script>
import io from 'socket.io-client';
import BaseModal from './BaseModal';
import Spinner from '@/components/loader/Spinner';
import ProgressBar from '@/components/loader/Progressbar';
import EventBus from '@/bus';

export default {
  components: {
    BaseModal,
    Spinner,
    ProgressBar
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
      needsMongo: false,
      selectedRepository: null,
      selectedBranch: null,
      selectedRunScript: null,
      branches: [],
      runScripts: [],
      loadingRequest: false,
      appName: '',
      socket: null,
      applicationCreated: false,
      isApplicationCreating: false,
      applicationCreateLogs: '',
      progressBars: {
        pullingRepo: {
          text: 'downloading git repository',
          started: true,
          progress: 0
        },
        buildingImage: {
          text: 'building your application',
          noProgress: true,
          started: false,
          finished: false
        },
        startingApp: {
          text: 'starting your application',
          noProgress: true,
          started: false,
          finished: false
        }
      }
    };
  },
  mounted() {
    this.socket = io(`${process.env.VUE_APP_BACKEND_URL}test`);
    this.socket.on('repoDownloadProgress', this.downloadProgress);
    this.socket.on('startBuildImage', this.startBuildImage);
    this.socket.on('finishBuildImage', this.finishBuildImage);
    this.socket.on('beginStartApplication', this.beginStartApplication);
    this.socket.on('finishStartApplication', this.finishStartApplication);
    console.log(this.socket);
  },
  beforeDestroy() {
    this.socket.close();
  },
  computed: {
    shownProgressBars() {
      const bars = {};
      Object.keys(this.progressBars).forEach(bar => {
        if (this.progressBars[bar].started) {
          bars[bar] = this.progressBars[bar];
        }
      });
      return bars;
    },
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
    downloadProgress({ progress }) {
      this.progressBars.pullingRepo.progress = progress;
    },
    startBuildImage() {
      this.progressBars.buildingImage.started = true;
    },
    finishBuildImage() {
      this.progressBars.buildingImage.finished = true;
    },
    beginStartApplication() {
      this.progressBars.startingApp.started = true;
    },
    finishStartApplication() {
      this.progressBars.startingApp.finished = true;
    },
    close() {
      this.$emit('close');
    },
    reset() {
      this.branches = [];
      this.runScripts = [];
      this.selectedBranch = null;
      this.selectedRunScript = null;
    },
    async doesApplicationAlreadyExist() {
      const { data: applications } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/applications/${this.appName}`
      );
      return applications.length;
    },
    async checkApplicationCreate() {
      if (await this.doesApplicationAlreadyExist()) {
        this.$snotify.confirm(
          'You already have an application under this path. If you click on "Yes" your old application gets removed and your new one is available under this path. Do you want to delete your old application?',
          'Alte Applikation löschen?',
          {
            closeOnClick: false,
            backdrop: 0.3,
            bodyMaxLength: 250,
            buttons: [
              {
                text: 'Yes',
                action: toast => {
                  this.$snotify.remove(toast.id);
                  this.createApplication();
                }
              },
              { text: 'No', action: toast => this.$snotify.remove(toast.id) }
            ]
          }
        );
      } else {
        this.createApplication();
      }
    },
    async createApplication() {
      this.isApplicationCreating = true;
      const { data: application } = await this.$axios.post(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/applications`,
        {
          repositoryName: this.selectedRepository.path,
          repositoryId: this.selectedRepository.id,
          branchName: this.selectedBranch.name,
          runScript: this.selectedRunScript,
          appName: this.appName,
          needsMongo: this.needsMongo
        }
      );
      this.applicationCreated = true;
      EventBus.$emit('applicationCreated', application);
    },
    async repositoryChange(repo) {
      this.loadingRequest = true;
      this.selectedRepository = repo;
      this.appName = this.selectedRepository.path;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/repositories/${
          this.selectedRepository.id
        }/branches`
      );
      this.branches = data;
      this.loadingRequest = false;
    },
    async branchChange(branch) {
      this.loadingRequest = true;
      this.selectedBranch = branch;
      this.runScripts = [];
      this.selectedRunScript = null;
      const { data } = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_URL}api/v1/repositories/${
          this.selectedRepository.id
        }/branches/${this.selectedBranch.name}/runScripts`
      );
      this.runScripts = data;
      this.loadingRequest = false;
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
.bars {
  .bar {
    display: flex;
    margin: 20px 0;
    .step {
      white-space: nowrap;
      margin-right: 10px;
    }
  }
}
</style>

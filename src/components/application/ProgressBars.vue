<template>
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

<script>
import ProgressBar from '@/components/loader/Progressbar';

export default {
  props: {
    socket: {
      type: Object,
      required: true
    }
  },
  components: {
    ProgressBar
  },
  data() {
    return {
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
  computed: {
    shownProgressBars() {
      const bars = {};
      Object.keys(this.progressBars).forEach(bar => {
        if (this.progressBars[bar].started) {
          bars[bar] = this.progressBars[bar];
        }
      });
      return bars;
    }
  },
  methods: {
    downloadProgress({ progress }) {
      this.progressBars.pullingRepo.progress = progress;
    },
    startBuildImage() {
      // if downloadsize was to small the progress wint get tracked
      // so set it manually to 100%
      this.progressBars.pullingRepo.progress = 100;
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
    }
  },
  mounted() {
    this.socket.on('repoDownloadProgress', this.downloadProgress);
    this.socket.on('startBuildImage', this.startBuildImage);
    this.socket.on('finishBuildImage', this.finishBuildImage);
    this.socket.on('beginStartApplication', this.beginStartApplication);
    this.socket.on('finishStartApplication', this.finishStartApplication);
  }
};
</script>

<style lang="scss" scoped>
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

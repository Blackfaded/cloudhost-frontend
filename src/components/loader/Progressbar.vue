<template>
  <div class="progressContainer">
    <div class="progressText"><slot></slot></div>
    <div
      :class="{ noProgress: noProgress, finished: finished }"
      class="progressBar"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    noProgress: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.progressContainer {
  position: relative;
  width: 100%;
  height: 20px;
  border-radius: 5px;
  border: 1px solid grey;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  .progressText {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .progressBar {
    transition: width 0.4s linear;
    height: 100%;
    background-color: var(--success);
    &.noProgress:not(.finished) {
      background-size: 35px 20px, 100% 100%, 100% 100%;
      background-image: linear-gradient(
        -45deg,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      );
      animation: animate-stripes 1s linear infinite;
    }
  }
}

@keyframes animate-stripes {
  100% {
    background-position: 100px 0px;
  }
}
</style>

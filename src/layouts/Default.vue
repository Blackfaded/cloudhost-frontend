<template>
  <div class="layout">
    <header-nav :collapsed="isSidenavCollapsed" :toggleSideNav="toggleSideNav"></header-nav>
    <div class="body">
      <side-nav :collapsed="isSidenavCollapsed"></side-nav>
      <div class="content">
        <slot></slot>

        <transition name="fade">
          <div v-if="!isSidenavCollapsed" @click="toggleSideNav" class="mask d-none-md"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/layout/SideNav';
import HeaderNav from '@/components/layout/Header';

export default {
  name: 'Layout',
  data() {
    return {
      isSidenavCollapsed: window.innerWidth < 576
    };
  },
  components: {
    SideNav,
    HeaderNav
  },
  methods: {
    toggleSideNav() {
      this.isSidenavCollapsed = !this.isSidenavCollapsed;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media screen and (min-width: 577px) {
  .layout {
    display: flex;
    flex-direction: column;

    .body {
      display: flex;
      flex: 1;

      .content {
        padding: 15px;
        flex: 1;
        .contentContainer {
          padding-top: 20px;
        }
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .layout {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .body {
      display: flex;
      flex: 1;
      width: calc(100vw + 200px);

      .content {
        position: relative;
        width: 100vw;
        overflow: hidden;
        overflow-x: auto;
        padding-top: 15px;

        .mask {
          z-index: 100;
          top: 0;
          left: 0;
          position: absolute;
          overflow: hidden;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
</style>

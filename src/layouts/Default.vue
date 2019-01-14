<template>
  <div class="layout">
    <header-nav :collapsed="isSidenavCollapsed" @toggleSideNav="toggleSideNav"></header-nav>
    <div class="body">
      <side-nav :collapsed="isSidenavCollapsed"></side-nav>
      <div class="content"><slot></slot></div>
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
      isSidenavCollapsed: false
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
.layout {
  display: flex;
  flex-direction: column;

  .body {
    display: flex;
    flex: 1;

    .content {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>

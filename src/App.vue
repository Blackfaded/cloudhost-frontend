<template>
  <component :is="layout" id="app"> <router-view /> </component>
</template>
<script>
import DefaultLayout from '@/layouts/Default';
import toggleTheme from '@/mixins/applyTheme';

export default {
  components: {
    DefaultLayout
  },
  mixins: [toggleTheme],
  computed: {
    layout() {
      const { layout } = this.$route.meta;
      return layout === 'none' ? 'div' : `${layout}-layout`;
    }
  },
  mounted() {
    this.applyTheme();
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--light-primary-color);
  color: var(--primary-text);
  min-height: 100vh;
  overflow-x: hidden;
}
</style>

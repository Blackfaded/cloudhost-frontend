<template>
  <component :is="layout" id="app"> <router-view /> </component>
</template>
<script>
import DefaultLayout from '@/layouts/Default';

export default {
  components: {
    DefaultLayout
  },
  computed: {
    layout() {
      const { layout } = this.$route.meta;
      console.log({ layout });
      return layout === 'none' ? 'div' : `${layout}-layout`;
    }
  },
  mounted() {
    console.log(this.$route.meta.layout);
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/hightlight.scss';

#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #292a2c;
  color: #fff;
  min-height: 100vh;
}
</style>

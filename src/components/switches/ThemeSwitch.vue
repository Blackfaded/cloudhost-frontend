<template>
  <toggle-button
    class="toggle"
    v-model="theme"
    labels
    :color="{
      checked: '#333333',
      unchecked: '#dddddd'
    }"
    :width="100"
    :height="30"
  >
    <font-awesome-icon slot="checked" icon="moon" class="theme theme--dark" />
    <font-awesome-icon slot="unchecked" icon="sun" class="theme theme--bright" />
  </toggle-button>
</template>

<script>
import { mapActions } from 'vuex';
import { ToggleButton } from 'vue-js-toggle-button';
import applyTheme from '@/mixins/applyTheme';

export default {
  components: {
    ToggleButton
  },
  mixins: [applyTheme],
  computed: {
    theme: {
      get() {
        return this.$store.state.theme.bright;
      },
      set() {
        // toggle Theme in Store
        this.toggleTheme();
        // toggle css variables
        this.applyTheme();
      }
    }
  },
  methods: {
    ...mapActions(['toggleTheme'])
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  margin: 0;
  .theme {
    font-size: 16pt;
    margin-top: 4px;
    &--dark {
      color: #ffffff;
    }
    &--bright {
      color: #000000;
    }
  }
}
</style>

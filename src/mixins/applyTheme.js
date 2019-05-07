export default {
  methods: {
    applyTheme() {
      // check if bright theme is currently active
      const brightThemeActive = document.documentElement.hasAttribute('theme');
      /* check if bright theme should be active
       * (if it got set to true in vuex store)
       */
      if (this.$store.state.theme.bright) {
        // if it should but is not set css variables to bright theme
        if (!brightThemeActive) {
          document.documentElement.setAttribute('theme', 'bright');
        }
        /* if it should not be active but it is, then change
         * css variables to default theme */
      } else if (brightThemeActive) {
        document.documentElement.removeAttribute('theme');
      }
    }
  }
};

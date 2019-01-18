export default {
  methods: {
    applyTheme() {
      const brightThemeActive = document.documentElement.hasAttribute('theme');
      if (this.$store.state.theme.bright) {
        if (!brightThemeActive) {
          document.documentElement.setAttribute('theme', 'bright');
        }
      } else if (brightThemeActive) {
        document.documentElement.removeAttribute('theme');
      }
    }
  }
};

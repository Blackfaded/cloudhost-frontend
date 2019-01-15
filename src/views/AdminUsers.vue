<template>
  <b-container>
    <h2 class="headline">Usermanagement</h2>
    <b-table striped hover :items="items"></b-table>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          'e-Mail': 'test@test.de',
          active: true,
          admin: false
        }
      ]
    };
  },
  mounted() {
    console.log('users');
  }
};
</script>

<style lang="scss" scoped>
.headline {
  button {
    margin-left: 20px;
  }
}
</style>

<template>
  <b-container class="dashboardContainer">
    <b-row>
      <b-col sm="4"> <div class="test">User Data 1</div> </b-col>
      <b-col sm="4"> <div class="test">User Data 2</div> </b-col>
      <b-col sm="4"> <div class="test">User Data 3</div> </b-col>
      <b-col sm="4"> <div class="test">User Data 4</div> </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      remember: false
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.test {
  background-color: #fff;
  height: 100px;
  color: black;
}
</style>

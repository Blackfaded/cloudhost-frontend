<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12"> <user-edit></user-edit> </b-col>
    </b-row>
    <hr />
    <h2>Applications (4)</h2>
    <b-row>
      <b-col sm="4"> <application-box></application-box> </b-col>
      <b-col sm="4"> <application-box></application-box> </b-col>
      <b-col sm="4"> <application-box></application-box> </b-col>
      <b-col sm="4"> <application-box></application-box> </b-col>
    </b-row>
  </b-container>
</template>
<script>
import UserEdit from '@/components/boxes/UserEdit';
import ApplicationBox from '@/components/boxes/Application';

export default {
  components: {
    UserEdit,
    ApplicationBox
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    console.log('user-edit');
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

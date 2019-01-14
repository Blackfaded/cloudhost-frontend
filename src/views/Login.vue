<template>
  <b-container class="loginContainer">
    <b-row>
      <b-col cols="8" offset="2"> <h1 class="headline">Cloudhost</h1> </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" offset="1" md="6" offset-md="3" lg="4" offset-lg="4">
        <div class="loginBox">
          <h5 class="loginBoxMessage">Sign in</h5>
          <b-input-group class="input">
            <b-form-input type="text" placeholder="E-Mail"></b-form-input>
            <b-input-group-append is-text>
              <font-awesome-icon icon="envelope" />
            </b-input-group-append>
          </b-input-group>
          <b-input-group class="input">
            <b-form-input type="password" placeholder="Password"></b-form-input>
            <b-input-group-append is-text> <font-awesome-icon icon="lock" /> </b-input-group-append>
          </b-input-group>
          <div class="footer">
            <b-form-checkbox id="checkbox1" v-model="remember">Remember me</b-form-checkbox>
            <b-button variant="primary" @click="login">Login</b-button>
          </div>
        </div>
      </b-col>
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
  methods: {
    login() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style lang="scss" scoped>
.loginContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .headline {
    text-align: center;
  }
  .loginBox {
    background-color: #fff;
    color: #363636;
    padding: 20px;
    box-shadow: 5px 7px 24px 2px rgba(0, 0, 0, 0.75);
    &Message {
      text-align: center;
    }
    .input {
      margin: 15px 0;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>

<template>
  <b-container class="loginContainer">
    <vue-snotify></vue-snotify>
    <theme-switch class="switch"></theme-switch>
    <b-row>
      <b-col cols="8" offset="2"> <h1 class="headline">Cloudhost</h1> </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" offset="1" md="6" offset-md="3" lg="4" offset-lg="4">
        <div class="loginBox">
          <h5 class="loginBoxMessage">Sign in</h5>
          <b-input-group class="input">
            <b-form-input type="text" v-model="username" placeholder="E-Mail"></b-form-input>
            <b-input-group-append is-text>
              <font-awesome-icon icon="envelope" />
            </b-input-group-append>
          </b-input-group>
          <b-input-group class="input">
            <b-form-input type="password" v-model="password" placeholder="Password"></b-form-input>
            <b-input-group-append is-text> <font-awesome-icon icon="lock" /> </b-input-group-append>
          </b-input-group>
          <div class="footer">
            <base-button variant="primary" @click="login">Login</base-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex';
import ThemeSwitch from '@/components/switches/ThemeSwitch';

export default {
  components: {
    ThemeSwitch
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['setToken', 'setUser']),
    async login() {
      try {
        const {
          data: { token }
        } = await this.$axios.post('auth', {
          username: this.username,
          password: this.password
        });
        this.setToken(token);
        this.setUser();
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.$snotify.error(error.response.data.message, error.response.data.error);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.loginContainer {
  .switch {
    position: absolute;
    top: 25px;
    right: 25px;
  }
  min-height: 100vh;
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
      .input-group-text {
        width: 40px;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>

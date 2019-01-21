<template>
  <b-container class="loginContainer">
    <theme-switch class="switch"></theme-switch>
    <b-row>
      <b-col cols="8" offset="2"> <h1 class="headline">Cloudhost</h1> </b-col>
    </b-row>

    <b-row>
      <b-col cols="10" offset="1" md="6" offset-md="3" lg="4" offset-lg="4">
        <div class="loginBox">
          <h5 class="loginBoxMessage">Sign in with</h5>
          <div class="body">
            <font-awesome-icon size="6x" :icon="['fab', 'gitlab']"></font-awesome-icon>
          </div>
          <div class="footer">
            <base-button variant="custom" class="gitlabButton" @click="login">
              <font-awesome-icon :icon="['fab', 'gitlab']"></font-awesome-icon>
              <span>GitLab</span>
            </base-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import ThemeSwitch from '@/components/switches/ThemeSwitch';
import connections from '@/config/oAuth';

const { clientId, redirectUrl } = connections;

export default {
  components: {
    ThemeSwitch
  },

  methods: {
    async login() {
      window.location.href = `https://git.hsrw.eu/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token`;
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
    box-shadow: 5px 7px 24px 2px rgba(0, 0, 0, 0.25);
    &Message {
      text-align: center;
    }
    .body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      .gitlabButton {
        background-color: orangered;
        font-size: 20pt;
        padding: 5px 30px;
        span {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>

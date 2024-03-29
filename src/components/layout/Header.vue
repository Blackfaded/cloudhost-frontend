<template>
  <div class="headerContainer">
    <div class="header d-none d-md-flex">
      <router-link to="/dashboard" class="logo" :class="{ collapsed: collapsed }">
        <transition name="fade-fast" mode="out-in">
          <span v-if="!collapsed" key="full">CloudHost</span> <span v-else key="short">CH</span>
        </transition>
      </router-link>
      <button class="toggleSideNav" @click="toggleSideNav">
        <font-awesome-icon v-if="collapsed" icon="arrow-right" />
        <font-awesome-icon v-else icon="arrow-left" />
      </button>
      <span class="space"></span>

      <button class="profile" @click="toggleSettings">
        <font-awesome-icon icon="cogs" />
        <span>{{ username }}</span>
        <font-awesome-icon icon="chevron-down" class="dropdown" :class="{ active: settingsOpen }" />
      </button>
    </div>

    <div class="header d-md-none">
      <button class="toggleSideNav" @click="toggleSideNav">
        <font-awesome-icon v-if="collapsed" icon="bars" />
        <font-awesome-icon v-else icon="times" />
      </button>
      <router-link to="/dashboard" class="logo"> <span>Cloudhost</span> </router-link>

      <span class="space"></span>
      <button class="profile" @click="toggleSettings">
        <font-awesome-icon icon="cogs" />
        <span>{{ username }}</span>
        <font-awesome-icon icon="chevron-down" class="dropdown" :class="{ active: settingsOpen }" />
      </button>
    </div>

    <transition name="fade-right">
      <user-settings-box
        v-click-outside="clickedOutside"
        v-show="settingsOpen"
        class="settings"
      ></user-settings-box>
    </transition>
  </div>
</template>

<script>
import UserSettingsBox from '@/components/boxes/UserSettings';

export default {
  components: {
    UserSettingsBox
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    toggleSideNav: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      settingsOpen: false
    };
  },
  methods: {
    toggleSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
    clickedOutside() {
      this.settingsOpen = false;
    }
  },
  computed: {
    username() {
      return this.$store.state.user.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.headerContainer {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: var(--dark-primary-color);
  color: var(--text);
  box-shadow: 5px 7px 24px 2px rgba(0, 0, 0, 0.1);
  .header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      background-color: transparent;
      color: var(--main-font-color);
      border: none;
      outline: none;
      &:hover {
        cursor: pointer;
      }
    }
    .logo {
      width: 200px;
      max-width: 200px;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      overflow: hidden;
      color: inherit;
      font-size: 22pt;

      &.collapsed {
        max-width: 65px;
      }
    }
    .toggleSideNav {
      min-width: 40px;
    }
    .space {
      flex: 20;
    }
    .profile {
      border-left: #000;
      height: 100%;
      margin: 0 10px;
      display: flex;
      align-items: center;
      span {
        margin: 0 10px;
      }
      .dropdown {
        transition: all 0.3s;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
  }
  .settings {
    z-index: 1000;
    position: absolute;
    width: 300px;
    top: 100%;
    right: 15px;
  }
}
</style>

<template>
  <div class="header">
    <router-link to="/dashboard" class="logo" :class="{ collapsed: collapsed }">
      <transition name="fade" mode="out-in">
        <span v-if="!collapsed" key="full"> Cloudhost </span> <span v-else key="short"> CH </span>
      </transition>
    </router-link>
    <button class="toggleSideNav" @click="toggleSideNav">
      <font-awesome-icon v-if="collapsed" icon="list-ul" />
      <font-awesome-icon v-else icon="ellipsis-v" />
    </button>
    <span class="space"></span>
    <button class="profile">
      <font-awesome-icon icon="envelope" />
      <span>René Heinen</span>
      <font-awesome-icon icon="chevron-down" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleSideNav() {
      this.$emit('toggleSideNav');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: rgb(29, 29, 29);
  box-shadow: 5px 7px 24px 2px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: transparent;
    color: white;
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

    span {
      margin: 0 10px;
    }
  }
}
</style>

<template>
  <div class="sidenav" :class="{ collapsed: collapsed }">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.to" v-if="isLinkExternal(link)" target="_blank">
          <font-awesome-icon :icon="[link.icon.prefix, link.icon.name]" />
          <span class="listText" :class="{ collapsed: collapsed }"> {{ link.name }}</span>
        </a>
        <router-link v-else :to="link.to" :class="{ disabled: checkDisabled(link) }">
          <font-awesome-icon :icon="[link.icon.prefix, link.icon.name]" />
          <span class="listText" :class="{ collapsed: collapsed }"> {{ link.name }}</span>
        </router-link>
      </li>
    </ul>
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
  data() {
    return {
      links: [
        {
          name: 'Dashboard',
          to: '/dashboard',
          icon: { prefix: 'fas', name: 'tachometer-alt' }
        },
        {
          name: 'Node.js',
          to: '/node',
          icon: { prefix: 'fab', name: 'node-js' }
        },
        {
          name: 'MongoDB',
          to: '/mongo',
          icon: { prefix: 'fas', name: 'database' }
        },
        {
          name: 'GitLab',
          to: 'http://git.hsrw.eu',
          icon: { prefix: 'fab', name: 'gitlab' }
        },
        {
          name: 'Help',
          to: '/help',
          icon: { prefix: 'fas', name: 'question-circle' }
        }
      ]
    };
  },
  methods: {
    isLinkExternal(link) {
      return link.to.includes('http');
    },
    checkDisabled(link) {
      return link.to === this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.sidenav {
  width: 200px;
  height: 100%;
  max-width: 200px;
  background-color: rgb(29, 29, 29);
  box-shadow: 5px 10px 24px 2px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;
  overflow: hidden;
  &.collapsed {
    max-width: 65px;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      border-bottom: 1px solid black;
      padding: 10px 25px;
      height: 50px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      a {
        color: inherit;
      }
      .listText {
        max-width: 200px;
        transition: all 0.5s ease;
        &.collapsed {
          max-width: 0;
          overflow: hidden;
          opacity: 0;
        }
      }
    }
  }
  .disabled {
    pointer-events: none;
  }
}
</style>

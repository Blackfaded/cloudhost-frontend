<template>
  <div class="sidenav" :class="{ collapsed: collapsed }">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.to" v-if="isLinkExternal(link)" target="_blank">
          <font-awesome-icon :icon="[link.icon.prefix, link.icon.name]" />
          <span class="listText" :class="{ collapsed: collapsed }">{{ link.name }}</span>
        </a>
        <router-link v-else :to="link.to" :class="{ disabled: checkDisabled(link) }">
          <font-awesome-icon :icon="[link.icon.prefix, link.icon.name]" />
          <span class="listText" :class="{ collapsed: collapsed }">{{ link.name }}</span>
        </router-link>
      </li>
      <template v-if="checkRole('admin')">
        <li class="administration"><span v-if="!collapsed">Administration</span></li>
        <li v-for="(link, index) in adminLinks" :key="`${index}-admin`">
          <router-link :to="link.to" :class="{ disabled: checkDisabled(link) }">
            <font-awesome-icon :icon="[link.icon.prefix, link.icon.name]" />
            <span class="listText" :class="{ collapsed: collapsed }">{{ link.name }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import checkRole from '@/mixins/checkRole';

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  mixins: [checkRole],
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
      ],
      adminLinks: [
        {
          name: 'Users',
          to: '/admin/users',
          icon: { prefix: 'fas', name: 'user' }
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
  z-index: 1;
  width: 200px;
  max-width: 200px;
  background-color: var(--dark-primary-color);
  color: var(--text);
  box-shadow: 5px 10px 24px 2px rgba(0, 0, 0, 0.1);
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
      &.administration {
        background-color: var(--accent-color);
        height: 30px;
      }
      a {
        color: inherit;
      }
      .listText {
        margin-left: 10px;
        max-width: 200px;
        transition: all 0.3s ease;
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

@media screen and (max-width: 576px) {
  .sidenav {
    transition: all 0.3s;
    max-width: 200px;
    &.collapsed {
      transform: translateX(-200px);
      max-width: 0;
      opacity: 0;
    }
  }
}
</style>

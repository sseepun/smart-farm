<template>
  <div v-if="user" class="middle-sidebar-header bg-white sticky-header">
    <button class="header-menu" @click="openNav"></button>
    <div class="float-left">
      <div v-if="page" class="font-md fw-500 text-grey-900">
        {{page}}
      </div>
    </div>
    <ul class="d-flex ml-auto right-menu-icon">
      <li class="d-block">
        <router-link :to="url+'/profile'">
          <Avatar :avatar="user.avatar" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'NavTop',
  props: {
    page: { type: String, default: '' },
  },
  data() {
    return {
      url: '/user'
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    })
  },
  mounted() {
    if(this.user.isAdmin) this.url = '/admin';
  },
  methods: {
    openNav() {
      $('.navigation').addClass('nav-active');
    }
  }
}
</script>

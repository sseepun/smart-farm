<template>

  <nav v-if="user && url" class="navigation scroll-bar">
    <div class="container pl-0 pr-0">
      <div class="nav-content">
        <div class="nav-top pl-4 pr-3">
          <router-link to="/" class="d-block ls-3 fw-600 text-current font-xl logo-text p-0 m-0">
            Smart Farm  
          </router-link>
          <a 
            href="javascript:" class="close-nav d-block d-lg-none p-0 m-0" 
            @click="closeNav" style="width:auto;"
          >
            <i class="ti-close bg-grey m-0 btn-round-sm font-xssss fw-700 text-dark"></i>
          </a>
        </div>

        <!-- Admin -->
        <ul v-if="user.isAdmin" class="mb-3">
          <li class="logo d-none d-xl-block d-lg-block"></li>
          <li>
            <router-link
              :to="this.url+'/dashboard'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 0 }"
            >
              <i class="feather-home font-sm mr-3"></i>
              <span class="fw-500 font-xss">หน้าแรก</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="this.url+'/users'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 1 }"
            >
              <i class="feather-users font-sm mr-3"></i>
              <span class="fw-500 font-xss">บัญชีผู้ใช้</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="this.url+'/farms'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 2 }"
            >
              <i class="feather-feather font-sm mr-3"></i>
              <span class="fw-500 font-xss">ฟาร์มทั้งหมด</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="this.url+'/profile'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 3 }"
            >
              <i class="feather-user font-sm mr-3"></i>
              <span class="fw-500 font-xss">ข้อมูลส่วนตัว</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="this.url+'/settings'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 4 }"
            >
              <i class="feather-settings font-sm mr-3"></i>
              <span class="fw-500 font-xss">การตั้งค่า</span>
            </router-link>
          </li>
        </ul>
        <!-- User -->
        <ul v-else class="mb-3">
          <li class="logo d-none d-xl-block d-lg-block"></li>
          <li>
            <router-link
              :to="this.url+'/profile'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 1 }"
            >
              <i class="feather-user font-sm mr-3"></i>
              <span class="fw-500 font-xss">ข้อมูลส่วนตัว</span>
            </router-link>
          </li>
          <li>
            <router-link
              :to="this.url+'/settings'" class="nav-content-bttn m-0" 
              :class="{ 'active': activeIndex == 2 }"
            >
              <i class="feather-settings font-sm mr-3"></i>
              <span class="fw-500 font-xss">การตั้งค่า</span>
            </router-link>
          </li>
        </ul>

      </div>
    </div>
  </nav>
  
  <div v-if="user && url" class="app-footer border-0 shadow-lg" style="justify-content:space-evenly;">
    <!-- Admin -->
    <template v-if="user.isAdmin">
      <router-link
        :to="this.url+'/dashboard'" class="nav-content-bttn" 
        :class="{ 'active': activeIndex == 0 }"
      >
        <i class="feather-home"></i>
      </router-link>
      <router-link
        :to="this.url+'/users'" class="nav-content-bttn mx-4" 
        :class="{ 'active': activeIndex == 1 }"
      >
        <i class="feather-users"></i>
      </router-link>
      <router-link
        :to="this.url+'/farms'" class="nav-content-bttn m-0" 
        :class="{ 'active': activeIndex == 2 }"
      >
        <i class="feather-feather"></i>
      </router-link>
      <router-link
        :to="this.url+'/profile'" class="nav-content-bttn m-0" 
        :class="{ 'active': activeIndex == 3 }"
      >
        <i class="feather-user"></i>
      </router-link>
      <router-link
        :to="this.url+'/settings'" class="nav-content-bttn m-0" 
        :class="{ 'active': activeIndex == 4 }"
      >
        <i class="feather-settings"></i>
      </router-link>
    </template>
    <template v-else>
      <router-link
        :to="this.url+'/dashboard'" class="nav-content-bttn" 
        :class="{ 'active': activeIndex == 0 }"
      >
        <i class="feather-home"></i>
      </router-link>
      <router-link
        :to="this.url+'/profile'" class="nav-content-bttn mx-4" 
        :class="{ 'active': activeIndex == 1 }"
      >
        <i class="feather-user"></i>
      </router-link>
      <router-link
        :to="this.url+'/settings'" class="nav-content-bttn m-0" 
        :class="{ 'active': activeIndex == 2 }"
      >
        <i class="feather-settings"></i>
      </router-link>
    </template>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'NavLeft',
  props: {
    activeIndex: { type: Number, default: 0 }
  },
  data() {
    return {
      url: ''
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    })
  },
  mounted() {
    if(this.user.isAdmin) this.url = '/admin';
    else this.url = '/user';
  },
  methods: {
    closeNav() {
      $('.navigation').removeClass('nav-active');
    }
  }
}
</script>

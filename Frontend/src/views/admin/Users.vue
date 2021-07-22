<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content bg-plain">
      <NavTop page="บัญชีผู้ใช้" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="d-flex ai-center jc-space-between">
            <h2 class="fw-600 font-lg m-0">บัญชีผู้ใช้</h2>
            <router-link to="/admin/user/create" class="btn px-3 py-2 m-0 bg-current font-xsss fw-500 text-white">
              เพิ่มผู้ใช้
            </router-link>
          </div>
          <div v-if="users && users.length" class="grids">
            <div v-for="(user, i) in users" :key="i" class="grid xl-25 lg-40 md-1-3 sm-50">
              <div class="card d-block w-100 shadow-xss rounded-lg p-adaptive border-0 text-center">
                <router-link 
                  :to="'/admin/user/read/'+user.id" 
                  class="ml-auto mr-auto rounded-lg overflow-hidden d-inline-block"
                >
                  <Avatar :avatar="user.avatar" classer="xxl" />
                </router-link>
                <h4 class="fw-700 font-xs mt-1 mb-1">
                  <span v-if="user.detail.firstname || user.detail.lastname">
                    {{user.detail.firstname}} {{user.detail.lastname}}
                  </span>
                  <span v-else>{{user.username}}</span>
                </h4>
                <p class="fw-500 font-xsss text-grey-500 m-0">
                  {{user.email}}
                </p>
                <div class="btn mt-2">
                  <router-link
                    :to="'/admin/user/read/'+user.id" style="width:75px;" 
                    class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current bg-current font-xsss fw-500 text-white mr-1"
                  >
                    ดูข้อมูล
                  </router-link>
                  <router-link
                    :to="'/admin/user/update/'+user.id" style="width:75px;" 
                    class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current font-xsss fw-500 text-current"
                  >
                    แก้ไข
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="grids">
            <div class="grid sm-100 mt-3">
              <h6 class="fw-400 font-md text-grey-500 m-0">ไม่พบบัญชีผู้ใช้</h6>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'AdminUsersPage',
  data() {
    return {
      navActiveIndex: 1,
      search: null
    };
  },
  mounted() {
    onMounted();
    this.getUserList({ search: this.search });
  },
  computed: {
    ...mapGetters({
      users: 'user/list'
    })
  },
  methods: {
    ...mapActions({
      getUserList: 'user/getList'
    })
  }
}
</script>

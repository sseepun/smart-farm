<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content bg-plain">
      <NavTop page="ข้อมูลส่วนตัว" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden mb-3" style="background:url('/assets/img/bg/02.jpg') center/cover;">
            <div class="card-body p-lg-5 p-4" style="background:rgba(0,0,0,.7);">
              <div class="clearfix"></div>
              <div class="row ai-end pb-4">
                <div class="col-lg-12 pl-xl-5 pt-xl-5">
                  <Avatar :avatar="user.avatar" classer="xxl" />
                </div>
                <div class="col-xl-4 col-lg-6">
                  <h4 class="fw-600 font-lg text-white mt-3 mb-1">
                    <span v-if="user.detail.firstname || user.detail.lastname">
                      {{user.detail.firstname}} {{user.detail.lastname}}
                    </span>
                    <span v-else>{{user.username}}</span>
                  </h4>
                  <span class="font-xss fw-500 text-grey-500 d-inline-block ml-0">
                    {{user.email}}
                  </span>
                </div>
                <div class="col-xl-4 col-lg-6"></div>
                <div class="col-xl-3 mt-4">
                  <router-link to="/admin/profile-update" class="btn px-4 py-2 m-0 bg-current font-xss fw-500 text-white">
                    แก้ไขข้อมูลส่วนตัว
                  </router-link>
                </div>
              </div>
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
  name: 'AdminProfilePage',
  data() {
    return {
      navActiveIndex: 3
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted() { onMounted(); }
}
</script>

<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content bg-plain">
      <NavTop page="การตั้งค่า" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="middle-wrap">
            <div class="card w-100 border-0 bg-white shadow-xs p-0 m-0">
              <div class="card-body p-lg-5 p-4 m-0 w-100 border-0">

                  <ul class="list-inline">
                    <li class="list-inline-item d-block border-bottom mr-0">
                      <router-link to="/admin/users" class="pt-2 pb-2 d-flex">
                        <i class="btn-round-md bg-gold-gradiant text-white feather-users font-md mr-3"></i> 
                        <h4 class="fw-600 font-xss mb-0 mt-3">บัญชีผู้ใช้</h4>
                        <i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i>
                      </router-link>
                    </li>
                    <li class="list-inline-item d-block border-bottom mr-0">
                      <router-link to="/admin/farms" class="pt-2 pb-2 d-flex">
                        <i class="btn-round-md bg-primary-gradiant text-white feather-feather font-md mr-3"></i> 
                        <h4 class="fw-600 font-xss mb-0 mt-3">ฟาร์มทั้งหมด</h4>
                        <i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i>
                      </router-link>
                    </li>
                    <li class="list-inline-item d-block border-bottom mr-0">
                      <router-link to="/admin/profile-update" class="pt-2 pb-2 d-flex">
                        <i class="btn-round-md bg-gold-gradiant text-white feather-user font-md mr-3"></i> 
                        <h4 class="fw-600 font-xss mb-0 mt-3">แก้ไขข้อมูลส่วนตัว</h4>
                        <i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i>
                      </router-link>
                    </li>
                    <li class="list-inline-item d-block border-bottom  mr-0">
                      <router-link to="/admin/password-update" class="pt-2 pb-2 d-flex">
                        <i class="btn-round-md bg-blue-gradiant text-white feather-inbox font-md mr-3"></i> 
                        <h4 class="fw-600 font-xss mb-0 mt-3">เปลี่ยนรหัสผ่าน</h4>
                        <i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i>
                      </router-link>
                    </li>
                    <li class="list-inline-item d-block mr-0">
                      <a href="javascript:" class="pt-2 pb-2 d-flex" @click="signout">
                        <i class="btn-round-md bg-red-gradiant text-white feather-lock font-md mr-3"></i>
                        <h4 class="fw-600 font-xss mb-0 mt-3">ออกจากระบบ</h4>
                        <i class="ti-angle-right font-xsss text-grey-500 ml-auto mt-3"></i>
                      </a>
                    </li>
                  </ul>
                  
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
  name: 'AdminSettingsPage',
  data() {
    return {
      navActiveIndex: 4
    };
  },
  mounted() { onMounted(); },
  methods: {
    ...mapActions({
      signout: 'auth/signout'
    })
  }
}
</script>

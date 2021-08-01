<template>
  <div class="main-wrapper">
    <NavLeft />
    
    <div class="main-content">
      <NavTop page="หน้าแรก" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">
          <div class="grids">
              
            <div class="grid xl-30 lg-45 sm-50">
              <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                <h2 class="font-md text-grey-900 fw-500 m-0 text-center">
                  จำนวนผู้ใช้ทั้งหมด
                </h2>
                <div class="display5-size fw-600 text-black text-center m-0">
                  {{users? users.length: 0}}
                </div>
                <div class="btns text-center">
                  <router-link to="/admin/users" class="btn px-2 py-1 m-0 bg-current font-xsss fw-500 text-white">
                    ดูทั้งหมด
                  </router-link>
                </div>
              </div>
            </div>
            
            <div class="grid xl-30 lg-45 sm-50">
              <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                <h2 class="font-md text-grey-900 fw-500 m-0 text-center">
                  จำนวนฟาร์มทั้งหมด
                </h2>
                <div class="display5-size fw-600 text-black text-center m-0">
                  {{farms? farms.length: 0}}
                </div>
                <div class="btns text-center">
                  <router-link to="/admin/farms" class="btn px-2 py-1 m-0 bg-current font-xsss fw-500 text-white">
                    ดูทั้งหมด
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
  name: 'AdminDashboardPage',
  mounted() {
    onMounted();
    this.getFarmList();
    this.getUserList();
  },
  computed: {
    ...mapGetters({
      users: 'user/list',
      farms: 'farm/list'
    })
  },
  methods: {
    ...mapActions({
      getUserList: 'user/getList',
      getFarmList: 'farm/getList'
    })
  }
}
</script>

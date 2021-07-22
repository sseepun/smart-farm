<template>
  <div class="main-wrapper">
    <NavLeft />
    
    <div class="main-content">
      <NavTop page="ฟาร์มของฉัน" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <h2 class="fw-600 font-lg m-0">เลือกฟาร์ม</h2>
          <div v-if="farms && farms.length" class="grids">
            <div v-for="(farm, i) in farms" :key="i" class="grid xl-25 md-1-3 sm-50">
              <div class="card course-card w-100 p-0 shadow-xss border-0 rounded-lg overflow-hidden m-0">
                <div class="card-image w-100 mb-3">
                  <router-link :to="'/user/farm/'+farm.id" class="ss-img">
                    <div class="img-bg" :style="'background-image:url(\''+farm.avatar+'\');'"></div>
                  </router-link>
                </div>
                <div class="card-body pt-0">
                  <h4 class="fw-700 font-xss m-0 lh-28 mb-1">
                    <router-link :to="'/user/farm/'+farm.id" class="text-dark text-grey-900">
                      {{farm.name}}
                    </router-link>
                  </h4>
                  <h6 class="font-xsss text-grey-600 fw-400 m-0">
                    {{farm.description}}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="grids">
            <div class="grid sm-100 mt-3">
              <h6 class="fw-400 font-md text-grey-500 m-0">ไม่พบฟาร์มของคุณ</h6>
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
    this.getFarmList({ user: this.user });
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      farms: 'farm/list'
    })
  },
  methods: {
    ...mapActions({
      getFarmList: 'farm/getList'
    })
  }
}
</script>

<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content bg-plain">
      <NavTop page="ฟาร์มทั้งหมด" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="d-flex ai-center jc-space-between">
            <h2 class="fw-600 font-lg m-0">ฟาร์มทั้งหมด</h2>
            <router-link to="/admin/farm/create" class="btn px-3 py-2 m-0 bg-current font-xsss fw-500 text-white">
              เพิ่มฟาร์ม
            </router-link>
          </div>
          <div v-if="farms && farms.length" class="grids">
            <div v-for="(farm, i) in farms" :key="i" class="grid xl-25 lg-40 md-1-3 sm-50">
              <div class="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden">
                <div 
                  class="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center" 
                  :style="'background-image:url(\''+farm.avatar+'\');'"
                ></div>
                <div class="card-body d-block w-100 pl-2 pr-2 text-center">
                  <div class="avatar-pull-top">
                    <Avatar :avatar="farm.user.avatar" classer="mxl bcolor-white-4" />
                  </div>
                  <div class="clearfix"></div>
                  <h4 class="farm-title fw-700 font-xss m-0 lh-28 mt-1 mb-0">
                    {{farm.name}} 
                  </h4>
                  <router-link 
                    :to="'/admin/user/read/'+farm.user.id" 
                    class="font-xsss text-grey-500 fw-600 m-0 mt-1" 
                  >
                    เจ้าของ : 
                    <span v-if="farm.user.detail.firstname || farm.user.detail.lastname" class="text-grey-700">
                      {{farm.user.detail.firstname}} {{farm.user.detail.lastname}}
                    </span>
                    <span v-else class="text-grey-700">{{farm.user.username}}</span>
                  </router-link>
                  <h6 class="farm-desc font-xsss text-grey-600 fw-400 m-0 mt-2">
                    {{farm.description}}
                  </h6>
                  <div class="clearfix"></div>
                  <div class="btn mt-2">
                    <router-link
                      :to="'/admin/farm/read/'+farm.id" style="width:75px;" 
                      class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current bg-current font-xsss fw-500 text-white mr-1"
                    >
                      ดูข้อมูล
                    </router-link>
                    <router-link
                      :to="'/admin/farm/update/'+farm.id" style="width:75px;" 
                      class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current font-xsss fw-500 text-current"
                    >
                      แก้ไข
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="grids">
            <div class="grid sm-100 mt-3">
              <h6 class="fw-400 font-md text-grey-500 m-0">ไม่พบฟาร์มในระบบ</h6>
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
  name: 'AdminFarmsPage',
  data() {
    return {
      navActiveIndex: 2,
      search: null
    };
  },
  mounted() {
    onMounted();
    this.getFarmList({ search: this.search });
  },
  computed: {
    ...mapGetters({
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

<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content bg-plain">
      <NavTop page="ข้อมูลส่วนตัว" />
      
      <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden m-0 mb-1" style="background:url('/assets/img/bg/02.jpg') center/cover;">
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
                <div class="col-xl-4 col-lg-6">
                  <h2 class="display5-size text-white fw-700 lh-1 m-0 mt-4">
                    {{farms? farms.length: 0}} 
                    <span class="text-white font-sm fw-600 mt-0 lh-3">ฟาร์ม</span>
                    <i class="feather-feather text-success font-xl ml-2"></i>
                  </h2>
                </div>
                <div class="col-xl-3 mt-4">
                  <router-link to="/admin/profile-update" class="btn px-4 py-2 m-0 bg-current font-xss fw-500 text-white">
                    แก้ไขข้อมูลส่วนตัว
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="farms && farms.length" class="grids">
            <div v-for="(farm, i) in farms" :key="i" class="grid xl-25 lg-40 md-1-3 sm-50">
              <div class="card d-block w-100 border-0 shadow-xss rounded-lg overflow-hidden">
                <div 
                  class="card-body position-relative h100 bg-gradiant-bottom bg-image-cover bg-image-center" 
                  :style="'background-image:url(\''+farm.avatar+'\');'"
                ></div>
                <div class="card-body d-block w-100 pl-2 pr-2 text-center">
                  <h4 class="farm-title fw-700 font-xss m-0 lh-28 m-0">
                    {{farm.name}} 
                  </h4>
                  <div class="font-xsss text-grey-500 fw-600 m-0 mt-1">
                    เจ้าของ : 
                    <span v-if="farm.user.detail.firstname || farm.user.detail.lastname" class="text-grey-700">
                      {{farm.user.detail.firstname}} {{farm.user.detail.lastname}}
                    </span>
                    <span v-else class="text-grey-700">{{farm.user.username}}</span>
                  </div>
                  <h6 class="farm-desc font-xsss text-grey-600 fw-400 m-0 mt-2">
                    {{farm.description}}
                  </h6>
                  <div class="clearfix"></div>
                  <div class="btn mt-2">
                    <router-link
                      :to="'/admin/farm/read/'+farm.id+'/profile'" style="width:75px;" 
                      class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current bg-current font-xsss fw-500 text-white mr-1"
                    >
                      ดูข้อมูล
                    </router-link>
                    <router-link
                      :to="'/admin/farm/update/'+farm.id+'/profile'" style="width:75px;" 
                      class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current font-xsss fw-500 text-current"
                    >
                      แก้ไข
                    </router-link>
                  </div>
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
      user: 'auth/user',
      farms: 'farm/list'
    })
  },
  mounted() {
    onMounted();
    this.getFarmList({ userId: this.user.id });
  },
  methods: {
    ...mapActions({
      getFarmList: 'farm/getList'
    })
  }
}
</script>

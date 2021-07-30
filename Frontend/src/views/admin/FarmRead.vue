<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <!-- Read -->
    <template v-if="process == 'read'">
      <div v-if="farm" class="main-content bg-plain">
        <NavTop page="ฟาร์ม" />
        <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="middle-sidebar-left pr-0">
            <div class="d-flex ai-center jc-space-between fw-wrap">
              <div class="mr-2 mb-3 mb-md-0">
                <h2 class="fw-600 font-lg m-0">{{farm.name}}</h2>
                <h6 class="font-xsss text-grey-600 fw-400 m-0 mt-1">
                  {{farm.description}}
                </h6>
              </div>
              <div class="btns">
                <router-link 
                  :to="backLink()" 
                  class="btn px-3 py-2 m-0 bg-current font-xsss fw-500 text-white mr-2"
                >
                  ย้อนกลับ
                </router-link>
                <a 
                  href="javascript:" @click="changeProcess('update')" 
                  class="btn px-3 py-2 m-0 text-current bcolor-current font-xsss fw-500"
                >
                  แก้ไข
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'AdminFarmReadPage',
  data() {
    return {
      navActiveIndex: 2,
      process: 'read',
      farmId: this.$route.params.id,
      source: this.$route.params.source
    };
  },
  computed: {
    ...mapGetters({
      farm: 'farm/single'
    })
  },
  mounted() {
    onMounted();
    var that = this;
    if(that.source) {
      if(that.source == 'user') that.navActiveIndex = 1;
      else if(that.source == 'profile') that.navActiveIndex = 3;
    }
    that.getFarm({ farmId: that.farmId }).then(function(data){
      that.mqttConnect(data);
    });
  },
  methods: {
    ...mapActions({
      updateAlert: 'alert/updateAlert',
      getFarm: 'farm/getSingle',
      mqttConnect: 'mqtt/connect'
    }),

    changeProcess(process) {
      if(!this.source) {
        this.$router.push('/admin/farm/'+process+'/'+this.farmId);
      } else {
        this.$router.push('/admin/farm/'+process+'/'+this.farmId+'/'+this.source);
      }
    },
    backLink() {
      if(!this.source) return '/admin/farms';
      else if(this.source == 'profile') return '/admin/profile';
      else return '/admin/user/read/'+this.farm.user.id;
    }
  }
}
</script>

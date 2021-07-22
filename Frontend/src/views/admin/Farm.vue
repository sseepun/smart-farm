<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <!-- Create -->
    <template v-if="process == 'create'">
      <div class="main-content bg-plain">
        <NavTop page="ฟาร์ม" />
        <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="middle-sidebar-left pr-0">
            <div class="middle-wrap">
              <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <router-link to="/admin/farms" class="d-inline-block mt-2">
                    <i class="ti-arrow-left font-sm text-white"></i>
                  </router-link>
                  <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">สร้างฟาร์ม</h4>
                </div>
                <div class="card-body p-lg-5 p-4 w-100 border-0">
                  <form @submit.prevent="onSubmitCreate">
                    <div class="row">
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="text" label="ชื่อฟาร์ม" :required="true" 
                          :value="dataset.name" @input="dataset.name = $event" 
                        />
                      </div>
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="text" label="คำบรรยาย" 
                          :value="dataset.description" @input="dataset.description = $event" 
                        />
                      </div>
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="select" label="เจ้าของฟาร์ม" :required="true" 
                          :options="userListOptions()" 
                          :value="dataset.user.id" @input="dataset.user.id = $event" 
                        />
                      </div>
                      
                      <div class="col-sm-12 mb-0 mt-2">
                        <ButtonSubmit label="สร้างฟาร์ม" classer="w200 bg-current border-0 p-0" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <!-- Update -->
    <template v-else-if="process == 'update'">
      <div v-if="farm" class="main-content bg-plain">
        <NavTop page="ฟาร์ม" />
        <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="middle-sidebar-left pr-0">
            <div class="middle-wrap">
              <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <a 
                    href="javascript:" @click="changeProcess('read')" 
                    class="d-inline-block mt-2"
                  >
                    <i class="ti-arrow-left font-sm text-white"></i>
                  </a>
                  <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">แก้ไขฟาร์ม</h4>
                </div>
                <div class="card-body p-lg-5 p-4 w-100 border-0">
                  <form @submit.prevent="onSubmitUpdate">
                    <div class="row">
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="text" label="ชื่อฟาร์ม" :required="true" 
                          :value="farm.name" @input="farm.name = $event" 
                        />
                      </div>
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="text" label="คำบรรยาย" 
                          :value="farm.description" @input="farm.description = $event" 
                        />
                      </div>
                      <div v-if="!source" class="col-sm-12 mb-3">
                        <FormGroup
                          type="select" label="เจ้าของฟาร์ม" :required="true" 
                          :options="userListOptions()" 
                          :value="farm.user.id" @input="farm.user.id = $event" 
                        />
                      </div>
                      
                      <div class="col-sm-12 mb-0 mt-0">
                        <ButtonSubmit label="แก้ไขฟาร์ม" classer="w200 bg-current border-0 p-0 mt-2 mr-2" />
                        <a 
                          href="javascript:" @click="isActivePopupDelete = true" 
                          class="form-control text-center text-white fw-500 w100 bg-danger border-0 p-0 mt-2"
                        >
                          ลบฟาร์ม
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
  
  <!-- Popup Delete -->
  <div 
    v-if="process == 'update' && farm" class="popup-container" 
    :class="{ 'active': isActivePopupDelete }"
  >
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupDelete = false"></div>
      <div class="popup-box md bg-white">
        <form class="w-full" @submit.prevent="onSubmitDelete">
          <h6 class="font-lg fw-500 text-grey-900 text-center">
            ยืนยันการลบฟาร์ม
          </h6>
          <div class="d-flex ai-center jc-center mt-4">
            <button type="submit" class="btn px-3 py-2 m-0 bg-danger font-xss fw-500 text-white">
              ลบฟาร์ม
            </button>
            <a 
              href="javascript:" @click="isActivePopupDelete = false" 
              class="btn px-3 py-2 m-0 bg-current font-xss fw-500 text-white ml-2"
            >
              ยกเลิก
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';
import { Farm } from '../../models';

export default {
  name: 'AdminFarmPage',
  data() {
    return {
      navActiveIndex: 2,
      process: this.$route.params.process,
      farmId: this.$route.params.id,
      source: this.$route.params.source,

      dataset: new Farm({}),

      isActivePopupDelete: false
    };
  },
  computed: {
    ...mapGetters({
      users: 'user/list',
      farm: 'farm/single'
    })
  },
  mounted() {
    onMounted();

    if(this.source) {
      if(this.source == 'user') this.navActiveIndex = 1;
      else if(this.source == 'profile') this.navActiveIndex = 3;
    }

    if(['create', 'update'].indexOf(this.process) > -1) {
      this.getUserList();
    }
    if(['read', 'update'].indexOf(this.process) > -1) {
      this.getFarm({ farmId: this.farmId });
    }
  },
  methods: {
    ...mapActions({
      updateAlert: 'alert/updateAlert',
      getFarm: 'farm/getSingle',
      createFarm: 'farm/create',
      updateFarm: 'farm/update',
      deleteFarm: 'farm/delete',
      getUserList: 'user/getList'
    }),

    userListOptions() {
      if(!this.users || !this.users.length) return [];
      else {
        return this.users.map(function(d) {
          let name = d.username;
          if(d.detail.firstname || d.detail.lastname) {
            name = d.detail.firstname + ' ' + d.detail.lastname;
          }
          return { value: d.id, display: name };
        });
      }
    },

    changeProcess(process) {
      this.process = process;
      if(!this.source) {
        this.$router.push('/admin/farm/'+this.process+'/'+this.farmId);
      } else {
        this.$router.push('/admin/farm/'+this.process+'/'+this.farmId+'/'+this.source);
      }
      this.getFarm({ farmId: this.farmId });
    },
    backLink() {
      if(!this.source) return '/admin/farms';
      else if(this.source == 'profile') return '/admin/profile';
      else return '/admin/user/read/'+this.farm.user.id;
    },

    onSubmitCreate() {
      var that = this;
      that.createFarm(that.dataset).then(function(){
        that.$router.push('/admin/farms');
      });
    },
    onSubmitUpdate() {
      var that = this;
      that.updateFarm(that.farm).then(function(){
        that.changeProcess('read');
      });
    },
    onSubmitDelete() {
      var that = this;
      that.deleteFarm(that.farm).then(function(){
        that.$router.push( that.backLink() );
      });
    }
  }
}
</script>

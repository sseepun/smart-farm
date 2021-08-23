<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <!-- Update -->
    <template v-if="process == 'update'">
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
                      <div class="col-sm-12 mb-3">
                        <FormGroup
                          type="text" label="รหัส Node MCU" :required="true" :disabled="true" 
                          :value="farm.nodeId" @input="farm.nodeId = $event" 
                        />
                      </div>
                      
                      <div class="col-sm-12 mb-0 mt-0">
                        <ButtonSubmit label="แก้ไขฟาร์ม" classer="w200 bg-current border-0 p-0 mt-2 mr-2" />
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
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';
import { Farm } from '../../models';

export default {
  name: 'UserFarmPage',
  data() {
    return {
      navActiveIndex: 1,
      process: this.$route.params.process,
      farmId: this.$route.params.id,

      dataset: new Farm({})
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
    if(['read', 'update'].indexOf(this.process) > -1) {
      this.getFarm({ farmId: this.farmId });
    }
  },
  methods: {
    ...mapActions({
      updateAlert: 'alert/updateAlert',
      getFarm: 'farm/getSingle',
      updateFarm: 'farm/update'
    }),

    changeProcess(process) {
      this.$router.push('/user/farm/'+process+'/'+this.farmId);
    },
    backLink() {
      return '/user/profile';
    },

    onSubmitUpdate() {
      var that = this;
      that.updateFarm(that.farm).then(function(){
        that.changeProcess('read');
      });
    }
  }
}
</script>

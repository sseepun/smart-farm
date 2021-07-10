<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content">
      <NavTop page="เปลี่ยนรหัสผ่าน" />
      
      <div v-if="dataset" class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="middle-wrap">
            <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                <router-link to="/user/settings" class="d-inline-block mt-2">
                  <i class="ti-arrow-left font-sm text-white"></i>
                </router-link>
                <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">เปลี่ยนรหัสผ่าน</h4>
              </div>
              <div class="card-body p-lg-5 p-4 w-100 border-0">
                <form @submit.prevent="onSubmit">
                  <div class="row">
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="password" label="รหัสผ่าน" :required="true" 
                        :value="dataset.password" @input="dataset.password = $event" 
                      />
                    </div>
                    <div class="col-sm-6"></div>
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="password" label="รหัสผ่านใหม่" :required="true" 
                        :value="dataset.newPassword" @input="dataset.newPassword = $event" 
                      />
                    </div>
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="password" label="ยืนยันรหัสผ่านใหม่" :required="true" 
                        :value="dataset.confirmPassword" @input="dataset.confirmPassword = $event" 
                      />
                    </div>
                    
                    <div class="col-sm-12 mb-0 mt-2">
                      <ButtonSubmit label="บันทึกข้อมูล" classer="w200 bg-current border-0 p-0" />
                    </div>
                  </div>
                </form>
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
  name: 'UserPasswordUpdatePage',
  data() {
    return {
      navActiveIndex: 2,
      dataset: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted() { onMounted(); },
  methods: {
    ...mapActions({
      userUpdatePassword: 'auth/updatePassword'
    }),

    onSubmit() {
      var that = this;
      var dataset = { ...that.user, ...that.dataset };
      that.userUpdatePassword(dataset).then(function(){
        that.$router.push('/user/settings');
      });
    }
  }
}
</script>

<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <div class="main-content">
      <NavTop page="แก้ไขข้อมูลส่วนตัว" />
      
      <div v-if="dataset" class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">

          <div class="middle-wrap">
            <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
              <div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                <router-link to="/user/profile" class="d-inline-block mt-2">
                  <i class="ti-arrow-left font-sm text-white"></i>
                </router-link>
                <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">แก้ไขข้อมูลส่วนตัว</h4>
              </div>
              <div class="card-body p-lg-5 p-4 w-100 border-0">
                <form @submit.prevent="onSubmit">
                  <div class="row">
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="text" label="ชื่อจริง" 
                        :value="dataset.firstname" @input="dataset.firstname = $event" 
                      />
                    </div>
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="text" label="นามสกุล" 
                        :value="dataset.lastname" @input="dataset.lastname = $event" 
                      />
                    </div>
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="text" label="ชื่อผู้ใช้" :required="true" 
                        :value="dataset.username" @input="dataset.username = $event" 
                      />
                    </div>
                    <div class="col-sm-6 mb-3">
                      <FormGroup
                        type="email" label="อีเมล" 
                        :value="dataset.email" @input="dataset.email = $event" 
                      />
                    </div>
                    <div class="col-sm-12 mb-3">
                      <div class="form-group">
                        <label class="fw-600 font-xss mb-1">รูปโปรไฟล์</label>
                        <div class="profile-selector">
                          <a
                            v-for="(avatar, i) in avatarList()" :key="i" href="javascript:" 
                            class="selector" :class="{ 'active': avatar == dataset.avatar }" 
                            @click="dataset.avatar = avatar"
                          >
                            <Avatar :avatar="avatar" classer="xl" />
                          </a>
                        </div>
                      </div>
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
  name: 'UserProfileUpdatePage',
  data() {
    return {
      navActiveIndex: 1,
      dataset: null
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted() {
    onMounted();
    this.dataset = Object.assign({}, this.user);
    delete this.dataset.accessToken;
    delete this.dataset.refreshToken;
  },
  methods: {
    ...mapActions({
      userUpdate: 'auth/update'
    }),

    formatPad(num, size) {
      num = num.toString();
      while(num.length < size) num = '0' + num;
      return num;
    },
    avatarList() {
      var list = [];
      for(let i=1; i<=32; i++){
        list.push('/assets/img/avatar/'+this.formatPad(i, 2)+'.png');
      }
      return list;
    },
    onSubmit() {
      var that = this;
      that.userUpdate(that.dataset).then(function(){
        that.$router.push('/user/profile');
      });
    }
  }
}
</script>

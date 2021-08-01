<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <!-- Create -->
    <template v-if="process == 'create'">
      <div class="main-content bg-plain">
        <NavTop page="บัญชีผู้ใช้" />
        <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="middle-sidebar-left pr-0">
            <div class="middle-wrap">
              <div class="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div class="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <router-link to="/admin/users" class="d-inline-block mt-2">
                    <i class="ti-arrow-left font-sm text-white"></i>
                  </router-link>
                  <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">สร้างบัญชีผู้ใช้</h4>
                </div>
                <div class="card-body p-lg-5 p-4 w-100 border-0">
                  <form @submit.prevent="onSubmitCreate">
                    <div class="row">
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="text" label="ชื่อจริง" :value="dataset.detail.firstname" 
                          @input="dataset.detail.firstname = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="text" label="นามสกุล" :value="dataset.detail.lastname" 
                          @input="dataset.detail.lastname = $event" 
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
                          type="email" label="อีเมล" :required="true" 
                          :value="dataset.email" @input="dataset.email = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="password" label="รหัสผ่าน" :required="true" 
                          :value="password" @input="password = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="password" label="ยืนยันรหัสผ่าน" :required="true" 
                          :value="confirmPassword" @input="confirmPassword = $event" 
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
                        <ButtonSubmit label="สร้างบัญชีผู้ใช้" classer="w200 bg-current border-0 p-0" />
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
    
    <!-- Read -->
    <template v-else-if="process == 'read'">
      <div v-if="user" class="main-content bg-plain">
        <NavTop page="บัญชีผู้ใช้" />
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
                  <div v-if="process == 'read'" class="col-xl-3 mt-4">
                    <a 
                      href="javascript:" @click="changeProcess('update')" 
                      class="btn px-3 py-2 m-0 bg-current font-xss fw-500 text-white"
                    >
                      แก้ไขข้อมูล
                    </a>
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
                        :to="'/admin/farm/read/'+farm.id+'/user'" style="width:75px;" 
                        class="btn px-2 py-1 lh-24 m-0 d-inline-block rounded-xl bcolor-current bg-current font-xsss fw-500 text-white mr-1"
                      >
                        ดูข้อมูล
                      </router-link>
                      <router-link
                        :to="'/admin/farm/update/'+farm.id+'/user'" style="width:75px;" 
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
    </template>
    
    <!-- Update -->
    <template v-else-if="process == 'update'">
      <div v-if="user" class="main-content bg-plain">
        <NavTop page="บัญชีผู้ใช้" />
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
                  <h4 class="font-sm text-white fw-500 ml-4 mb-0 mt-2">แก้ไขบัญชีผู้ใช้</h4>
                </div>
                <div class="card-body p-lg-5 p-4 w-100 border-0">
                  <form @submit.prevent="onSubmitUpdate">
                    <div class="row">
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="text" label="ชื่อจริง" :value="user.detail.firstname" 
                          @input="user.detail.firstname = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="text" label="นามสกุล" :value="user.detail.lastname" 
                          @input="user.detail.lastname = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="text" label="ชื่อผู้ใช้" :required="true" 
                          :value="user.username" @input="user.username = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="email" label="อีเมล" :required="true" 
                          :value="user.email" @input="user.email = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="password" label="รหัสผ่าน" 
                          :value="password" @input="password = $event" 
                        />
                      </div>
                      <div class="col-sm-6 mb-3">
                        <FormGroup
                          type="password" label="ยืนยันรหัสผ่าน" 
                          :value="confirmPassword" @input="confirmPassword = $event" 
                        />
                      </div>
                      <div class="col-sm-12 mb-3">
                        <div class="form-group">
                          <label class="fw-600 font-xss mb-1">รูปโปรไฟล์</label>
                          <div class="profile-selector">
                            <a
                              v-for="(avatar, i) in avatarList()" :key="i" href="javascript:" 
                              class="selector" :class="{ 'active': avatar == user.avatar }" 
                              @click="user.avatar = avatar"
                            >
                              <Avatar :avatar="avatar" classer="xl" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-sm-12 mb-0 mt-0">
                        <ButtonSubmit label="แก้ไขบัญชีผู้ใช้" classer="w200 bg-current border-0 p-0 mt-2 mr-2" />
                        <a 
                          href="javascript:" @click="isActivePopupDelete = true" 
                          class="form-control text-center text-white fw-500 w100 bg-danger border-0 p-0 mt-2"
                        >
                          ลบผู้ใช้
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
    v-if="process == 'update' && user" class="popup-container" 
    :class="{ 'active': isActivePopupDelete }"
  >
    <div class="wrapper">
      <div class="close-filter" @click="isActivePopupDelete = false"></div>
      <div class="popup-box md bg-white">
        <form class="w-full" @submit.prevent="onSubmitDelete">
          <h6 class="font-lg fw-500 text-grey-900 text-center">
            ยืนยันการลบบัญชีผู้ใช้
          </h6>
          <div class="d-flex ai-center jc-center mt-4">
            <button type="submit" class="btn px-3 py-2 m-0 bg-danger font-xss fw-500 text-white">
              ลบผู้ใช้
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
import { User } from '../../models';

export default {
  name: 'AdminUserPage',
  data() {
    return {
      navActiveIndex: 1,
      process: this.$route.params.process,
      userId: this.$route.params.id,

      dataset: new User({}),
      password: null,
      confirmPassword: null,

      isActivePopupDelete: false
    };
  },
  computed: {
    ...mapGetters({
      user: 'user/single',
      farms: 'farm/list'
    })
  },
  mounted() {
    onMounted();
    if(['read', 'update'].indexOf(this.process) > -1) {
      this.getUser({ userId: this.userId });
      this.getFarmList({ userId: this.userId });
    }
  },
  methods: {
    ...mapActions({
      updateAlert: 'alert/updateAlert',
      getUser: 'user/getSingle',
      createUser: 'user/create',
      updateUser: 'user/update',
      deleteUser: 'user/delete',
      getFarmList: 'farm/getList'
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

    changeProcess(process) {
      this.process = process;
      this.$router.push('/admin/user/'+this.process+'/'+this.userId);
      this.getUser({ userId: this.userId });
    },

    onSubmitCreate() {
      var that = this;
      if(that.password != that.confirmPassword) {
        that.updateAlert({ type: 'Warning', message: 'รหัสผ่านไม่ตรงกัน' });
      } else {
        that.createUser({
          ...that.dataset, 
          ...{password: that.password, confirmPassword: that.confirmPassword }
        }).then(function(){
          that.$router.push('/admin/users');
        });
      }
    },
    onSubmitUpdate() {
      var that = this;
      if((that.password || that.confirmPassword) && that.password != that.confirmPassword) {
        that.updateAlert({ type: 'Warning', message: 'รหัสผ่านไม่ตรงกัน' });
      } else {
        that.updateUser({
          ...that.user, 
          ...{password: that.password, confirmPassword: that.confirmPassword }
        }).then(function(){
          that.changeProcess('read');
        });
      }
    },
    onSubmitDelete() {
      var that = this;
      that.deleteUser(that.user).then(function(){
        that.$router.push('/admin/users');
      });
    }
  }
}
</script>

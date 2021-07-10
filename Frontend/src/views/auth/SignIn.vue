<template>
  <section class="auth-01" style="background-image:url('/assets/img/bg/01.jpg');">
    <div class="wrapper">
      <div class="auth-container" data-aos="fade-up" data-aos-delay="0">
        <div class="text-center">
          <h1 class="fw-600 font-sm text-current mb-1">Smart Farm</h1>
          <h2 class="fw-700 font-xxl">เข้าสู่ระบบ</h2>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="mt-4">
            <FormGroup
              type="text" :value="dataset.username" @input="dataset.username = $event" 
              :iconPrepend="true" icon="ti-user" placeholder="ชื่อผู้ใช้" :required="true" 
            />
          </div>
          <div class="mt-2">
            <FormGroup
              type="password" :value="dataset.password" @input="dataset.password = $event" 
              :iconPrepend="true" icon="ti-lock" placeholder="รหัสผ่าน" :required="true" 
            />
          </div>
          <div class="form-group mt-2 mb-0">
            <ButtonSubmit label="เข้าสู่ระบบ" classer="bg-current border-0 p-0" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'AuthSignInPage',
  data() {
    return {
      dataset: {
        username: '',
        password: ''
      }
    }
  },
  mounted() { onMounted() },
  methods: {
    ...mapActions({
      signin: 'auth/signin'
    }),

    onSubmit() {
      this.signin(this.dataset);
      this.$router.push('/user/dashboard');
    }
  }
}
</script>

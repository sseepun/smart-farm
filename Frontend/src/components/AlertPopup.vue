<template>

  <div
    class="alert-popup"
    :class="{ 
      'active': status,
      'info': selfAlert.type == 'Info',
      'success': selfAlert.type == 'Success',
      'warning': selfAlert.type == 'Warning',
      'danger': selfAlert.type == 'Danger'
    }"
  >
    <div class="wrapper">
      <div class="text-container">
        <h6 v-html="selfAlert.type"></h6>
        <p v-html="selfAlert.message"></p>
      </div>
    </div>
  </div>

  <div class="alert-loading" :class="{ 'active': alertLoading }">
    <div class="wrapper">
      <h1 class="fw-600 mb-0">กำลังโหลดข้อมูล...</h1>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'AlertPopup',
  data() {
    return {
      status: false,
      timeout: null,
      selfAlert: Object.assign({}, this.alert)
    }
  },
  computed: {
    ...mapGetters({
      alert: 'alert/value',
      alertLoading: 'alert/loading',
    })
  },
  watch: { 
    alert: function(){
      this.status = true;
      this.selfAlert = Object.assign({}, this.alert);
      this.fadeOut();
    }
  },
  methods: {
    fadeOut() {
      var that = this;
      if(that.timeout) clearTimeout(that.timeout);
      that.timeout = setTimeout(function(){
        that.status = false;
      }, 2400);
    }
  }
}
</script>

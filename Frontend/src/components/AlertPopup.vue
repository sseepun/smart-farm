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

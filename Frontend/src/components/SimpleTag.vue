<template>
  <span v-if="type == 'Primary'" 
    class="alert-primary text-primary d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
  <span v-if="type == 'Secondary'" 
    class="alert-secondary text-secondary d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
  <span v-if="type == 'Info'" 
    class="alert-info text-info d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
  <span v-if="type == 'Success'" 
    class="alert-success text-success d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
  <span v-if="type == 'Warning'" 
    class="alert-warning text-warning d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
  <span v-if="type == 'Danger'" 
    class="alert-danger text-danger d-inline-block font-xssss fw-600 py-0 px-2 lh-28 rounded-lg"
  >
    {{label}}
  </span>
</template>

<style scoped>
  span{transform:translateY(-3px);}
</style>

<script>
export default {
  name: 'SimpleTag',
  props: {
    type: { type: String, default: 'Primary' },
    label: { type: String, default: '' },
  }
}
</script>

<template>
  <div class="switch-toggle" :class="{ 'active': value, 'disabled': disabled }">
    <input 
      type="checkbox" :id="'switch_'+randomId" :checked="value? true: false"
      @change="(event)=>$emit('change', event.target.checked)" 
      :disabled="disabled" 
    />
    <label class="switch-bar" :for="'switch_'+randomId"></label>
    <div class="swicth-texts">
      <div>{{textInactive}}</div>
      <div>{{textActive}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchToggle',
  props: {
    textInactive: { type: String, default: '' },
    textActive: { type: String, default: '' },
    value: { type: [String, Number, Boolean], default: '' },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      randomId: Math.round(Math.random() * 1000000)
    };
  },
  emits: [ 'change' ]
}
</script>

<template>

  <div v-if="type == 'number'" class="form-group" :class="selfClass">
    <label v-if="label" class="fw-600 font-xss mb-1">
      {{label}} <span v-if="required" class="text-danger">*</span>
    </label>
    <i v-if="iconPrepend && icon" class="font-xs text-grey-500 pr-0" :class="icon"></i>
    <input 
      :type="type" class="form-control text-grey-900" 
      :class="{ 'pl-5': iconPrepend, 'pr-5': iconAppend }" 
      v-model="value" @input="(event)=>$emit('input', event.target.value)" 
      :placeholder="placeholder" 
      :required="required? true: false"
      :readonly="readonly? true: false"
      :disabled="disabled? true: false" 
      :min="min" :max="max" :step="step" 
    />
    <i v-if="iconAppend && icon" class="font-xs text-grey-500 pr-0" :class="icon"></i>
  </div>

  <div v-else class="form-group" :class="selfClass">
    <label v-if="label" class="fw-600 font-xss mb-1">
      {{label}} <span v-if="required" class="text-danger">*</span>
    </label>
    <i v-if="iconPrepend && icon" class="font-xs text-grey-500 pr-0" :class="icon"></i>
    <input 
      :type="type" class="form-control text-grey-900" 
      :class="{ 'pl-5': iconPrepend, 'pr-5': iconAppend }" 
      v-model="value" @input="(event)=>$emit('input', event.target.value)" 
      :placeholder="placeholder" 
      :required="required? true: false"
      :readonly="readonly? true: false"
      :disabled="disabled? true: false" 
    />
    <i v-if="iconAppend && icon" class="font-xs text-grey-500 pr-0" :class="icon"></i>
  </div>

</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    classer: { type: String, default: '' },
    
    iconPrepend: { type: Boolean, default: false },
    iconAppend: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    value: { type: [String, Number, Date], default: '' },

    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    
    min: { type: [String, Number], default: '' },
    max: { type: [String, Number], default: '' },
    step: { type: [String, Number], default: '' },
  },
  data() {
    return {
      selfClass: this.classer.slice()
    }
  },
  mounted() {
    if(this.icon){
      this.selfClass += 'icon-input';
    }
  },
  emits: [ 'input' ]
}
</script>

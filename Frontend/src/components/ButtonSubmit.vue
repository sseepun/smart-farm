<template>

  <button type="submit" :class="classer" class="form-control text-center text-white fw-500">
    {{label}}
  </button>

</template>

<script>
export default {
  name: 'ButtonSubmit',
  props: {
    classer: { type: String, default: '' },
    label: { type: String, default: '' }
  }
}
</script>

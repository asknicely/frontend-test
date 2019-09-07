<template>
  <div>
    <h2>{{title}}:</h2>
    <form class="t-form--container" v-on:submit.prevent="onSubmit">
      <slot></slot>
    </form>
  </div>
</template>

<script>

export default {
  provide(){
    return {
        tForm: this
    }
  },
  props:{
    // model can have multiple properties since the form may have multiple inputs
    model:{
      type:Object,
      required:true
    },
    rules:{
      type:Object
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
.t-form--container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  border: 1px solid var(--grey);
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
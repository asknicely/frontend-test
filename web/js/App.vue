<template>
    <div>
        <h1>neo test</h1>
        <t-button class="text-primary" primary loading label="read more"></t-button>
    </div>
</template>
<script>
import TButton from "./components/commons/TButton.vue"
export default {
  name: "app",
  components: {
    TButton
  },
  beforeMount() {
    // get the todos list data from the twig template
    const id = "vue-todos"
    const node = document.getElementById(id)
    const props = JSON.parse(node.getAttribute('data-todos'))
    console.log(props)
  }
}
</script>
<style lang="scss">
</style>
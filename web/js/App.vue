<template>
    <h1>neo test</h1>
</template>
<script>
export default {
  name: "app",
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
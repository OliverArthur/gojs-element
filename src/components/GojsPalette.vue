<template>
  <article :id="el" :class="className" class="gojs-palette" />
</template>

<script>
export default {
  name: 'GojsPalette',
  props: {
    className: {
      type: String
    },
    el: {
      type: String
    }
  }
}
</script>

<style>
.gojs-palette {
  height: 100vh;
  position: relative;
  width: 10rem;
}
</style>

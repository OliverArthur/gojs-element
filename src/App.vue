<template>
  <gojs-palette el="gojs_palette"> </gojs-palette>
  <gojs-diagram
    el="gojs"
    :nodeDataArray="nodeDataArray"
    :modelData="modelData"
    :linkDataArray="linksArray"
    :initDiagram="initDiagram"
  ></gojs-diagram>
</template>

<script>
import { ref } from 'vue'
import GojsDiagram from '@/components/GojsDiagram'
import GojsPalette from '@/components/GojsPalette'
import diagram from '@/services/diagram'
import useDiagram from '@/hooks/useDiagram'

export default {
  name: 'App',
  components: {
    GojsDiagram,
    GojsPalette
  },
  setup() {
    const nodeDataArray = ref(diagram.nodeArrayModel)
    const linksArray = ref(diagram.linksNodeArray)
    const modelData = ref(diagram.dataModel)
    const { initDiagram } = useDiagram()

    return {
      nodeDataArray,
      linksArray,
      modelData,
      initDiagram
    }
  }
}
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

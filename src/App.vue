<template>
  <gojs-element
    el="gojs"
    :nodeDataArray="nodeDataArray"
    :modelData="modelData"
    :initDiagram="init"
  ></gojs-element>
</template>

<script>
import { ref } from 'vue'
import GojsElement from './components/GojsElement'
import * as go from 'gojs'

export default {
  name: 'App',
  components: {
    GojsElement
  },
  setup() {
    const nodeDataArray = ref([
      { key: 'Alpha', color: 'lightblue' },
      { key: 'Beta', color: 'orange' },
      { key: 'Gamma', color: 'lightgreen' },
      { key: 'Delta', color: 'pink' }
    ])

    const modelData = ref({
      canRelink: true
    })

    function init() {
      const $ = go.GraphObject.make
      const diagram = $(go.Diagram, {
        'undoManager.isEnabled': true,
        model: $(go.GraphLinksModel, {
          linkKeyProperty: 'key'
        })
      })
      diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        $(
          go.Shape,
          'RoundedRectangle',
          {
            strokeWidth: 0,
            fill: 'white',
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer'
          },
          new go.Binding('fill', 'color')
        ),
        $(
          go.TextBlock,
          {
            margin: 8,
            font: 'bold 14px sans-serif',
            stroke: '#333'
          },
          new go.Binding('text', 'key')
        )
      )

      diagram.linkTemplate = $(
        go.Link,
        new go.Binding('relinkableFrom', 'canRelink').ofModel(),
        new go.Binding('relinkableTo', 'canRelink').ofModel(),
        $(go.Shape),
        $(go.Shape, { toArrow: 'Standard' })
      )

      return diagram
    }

    return {
      init,
      nodeDataArray,
      modelData
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

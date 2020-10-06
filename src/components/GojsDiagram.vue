<template>
  <div :id="el" class="gojs-diagram" :class="divClassName"></div>
</template>

<script>
import * as go from 'gojs'
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'

export default {
  name: 'GojsDiagram',
  props: {
    el: {
      type: String,
      required: true
    },
    divClassName: {
      type: String,
      default: null
    },
    initDiagram: {
      type: Function,
      default: () => go.Diagram
    },
    nodeDataArray: {
      type: Array,
      default: () => []
    },
    linkDataArray: {
      type: Array,
      default: () => []
    },
    modelData: {
      type: Object,
      default: go.ObjectData
    }
  },
  setup(props, ctx) {
    const modelChangedListener = ref(() => null)

    function getDiagram() {
      return props.el ? go.Diagram.fromDiv(props.el) : null
    }

    onMounted(() => {
      const diagram = props.initDiagram()
      diagram.div = props.el
      diagram.delayInitialization(() => {
        const model = diagram.model
        model.commit((m) => {
          m.mergeNodeDataArray(m.cloneDeep(props.nodeDataArray))
          if (
            !!props.linkDataArray &&
            m instanceof go.GraphLinksModel
          ) {
            m.mergeLinkDataArray(m.cloneDeep(props.linkDataArray))
          }
          if (props.modelData) {
            m.assignAllDataProperties(m.modelData, props.modelData)
          }
        }, null)

        modelChangedListener.value = (e) => {
          if (e.isTransactionFinished) {
            const dataChanges = e.model.toIncrementalData(e)
            if (dataChanges !== null) {
              ctx.emit('model-change', dataChanges)
            }
          }
        }
        diagram.addModelChangedListener(modelChangedListener.value)
      })
    })

    watch(
      () => props.el,
      props.divClassName,
      () => {
        nextTick(() => {
          const diagram = getDiagram()
          diagram.requestUpdate()
        })
      }
    )

    watch(
      () => props.linkDataArray,
      props.nodeDataArray,
      () => {
        _updateDiagram()
      },
      { deep: true }
    )

    function _updateDiagram() {
      const diagram = getDiagram()
      if (diagram) {
        const model = diagram.model
        if (modelChangedListener.value !== null) {
          model.removeChangedListener(modelChangedListener.value)
        }
        model.startTransaction('update data')
        model.mergeNodeDataArray(model.cloneDeep(props.nodeDataArray))
        if (
          !!props.linkDataArray &&
          model instanceof go.GraphLinksModel
        ) {
          model.mergeLinkDataArray(
            model.cloneDeep(props.linkDataArray)
          )
        }
        if (props.modelData) {
          model.assignAllDataProperties(
            model.modelData,
            props.modelData
          )
        }
        model.commitTransaction('update data')
        if (modelChangedListener.value !== null) {
          model.addChangedListener(modelChangedListener.value)
        }
      }
    }

    onBeforeUnmount(() => {
      const diagram = getDiagram()
      if (diagram) {
        diagram.div = null
        if (modelChangedListener.value !== null) {
          diagram.removeModelChangedListener(
            modelChangedListener.value
          )
          modelChangedListener.value = null
        }
      }
    })

    return {
      getDiagram
    }
  }
}
</script>

<style>
.gojs-diagram {
  height: 100vh;
  position: relative;
  width: calc(100vw - 10rem);
}
</style>

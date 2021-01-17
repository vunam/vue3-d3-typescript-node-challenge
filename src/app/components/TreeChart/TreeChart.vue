<template>
  <div>
      Tree
  </div>
 
</template>

<style lang="css" scope>
</style>

<script lang="ts">
import { defineComponent, inject } from "vue"
import { tree } from "d3-hierarchy";
import { StateProps, ApiNode } from "../../types"

export default defineComponent({
  inject: ['state', 'setState'],
  props: ['data'],
})
</script>
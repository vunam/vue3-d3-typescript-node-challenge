<template>
  <div class="Main-container">
    <div v-if="state.nodeList.length" >
      <h1 class="Main-title">ABN AMRO Code Challenge</h1>
      <TreeChart :data="parentChildData" />
    </div>
     <div v-else>
      Loading...
    </div>
  </div>
 
</template>

<style lang="css" scope>
    .Main-container {
      flex-grow: 1;
      padding: 20px;
    }
    .Main-title {
      margin-top: 0;
    }
</style>

<script lang="ts">
import { defineComponent, inject } from "vue"
import { stratify } from "d3-hierarchy";
import { StateProps, ApiNode } from "../../types"
import TreeChart from "../TreeChart/TreeChart";

export default defineComponent({
  inject: ['state', 'setState'],
  async mounted() {
    const response = await fetch('http://localhost:8888/all');
    const result = await response.json();
    this.setState('nodeList', result);
  },
  components: {TreeChart},
  computed: {
    parentChildData() {
      if (!this.state.nodeList.length) {
        return [];
      }

      const root = stratify()
        .id((d: ApiNode) => d.name)
        .parentId((d: ApiNode) => d.parent)(
        this.state.nodeList)

      return root;
    }
  }
})
</script>
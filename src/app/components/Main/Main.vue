<template>
  <div v-if="data.length" class="Main-container">
    <h1 class="Main-title">ABN AMRO Code Challenge</h1>
    {{ JSON.stringify(data) }}
  </div>
  <div v-else>
    Loading...
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
import { defineComponent } from "vue"

export default defineComponent({
  async mounted() {
    const response = await fetch('http://localhost:8888/all');
    const result = await response.json();
    this.data = result;
  },
  data() {
    return {
      data: []
    }
  },
})
</script>
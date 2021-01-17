<template>
  <div class="Main-container">
    Main
    {{ JSON.stringify(data) }}
  </div>
</template>

<style lang="css" scope>
</style>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  async mounted() {
    const response = await fetch('http://localhost:8888/all');
    const result = await response.json();
    console.log(result)
    this.data = result;
  },
  data() {
    return {
      data: []
    }
  },
})
</script>
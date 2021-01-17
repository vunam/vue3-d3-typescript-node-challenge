<template>
  <div class="app-container">
    <SideBar />
    <Main />
  </div>
</template>

<style lang="css" scope>
  .app-container {
    position: relative;
    color: red;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';

export default defineComponent({
  components: {
    SideBar, Main,
  },
})
</script>
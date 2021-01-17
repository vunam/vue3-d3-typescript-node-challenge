<template>
  <div class="SideBar-container" :class="{ 'SideBar-container--active': state.isSideBarOpen }">
    <div class="SideBar-inner">
      SideBar
      <button @click="onClick">Toggle sidebar</button>
      {{ state.isSideBarOpen }}
    </div>
  </div>
</template>

<style lang="css" scope>
  .SideBar-container {
    width: 300px;
    background: #eee;
    transition: transform 0.5s;
    transform: translate3d(-300px, 0, 0);
  }

  .SideBar-inner {
    padding: 20px;
  }

  .SideBar-container--active {
    transform: translate3d(0, 0, 0);
  }
</style>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  inject: ['state', 'setState'],
  methods: {
    onClick() {
      this.setState('isSideBarOpen', !this.state.isSideBarOpen);
    }
  }
})
</script>
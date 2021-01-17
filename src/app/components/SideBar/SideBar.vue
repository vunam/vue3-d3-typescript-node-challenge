<template>
  <div class="SideBar-container" :class="{ 'SideBar-container--active': sideBarOpen }">
    <div class="SideBar-inner">
      SideBar
      <button @click="onClick">Toggle sidebar</button>
      {{ sideBarOpen }}
    </div>
  </div>
</template>

<style lang="css" scope>
  .SideBar-container {
    width: 300px;
    background: #eee;
    transition: transform 0.5s;
  }

  .SideBar-inner {
    padding: 20px;
  }

  .SideBar-container--active {
    transform: translate3d(-300px, 0, 0);
  }
</style>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  setup() {
    const state = reactive({
      sideBarOpen: false,
    });
    return state;
  },
  methods: {
    onClick() {
      this.sideBarOpen = !this.sideBarOpen;
    }
  }
})
</script>
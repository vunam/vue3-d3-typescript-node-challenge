<template>
    <div class="app-container">
        <SideBar />
        <Main />
    </div>
</template>

<style lang="css" scope>
.app-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
}
</style>

<script lang="ts">
import { defineComponent, reactive, provide } from 'vue';
import SideBar from './components/SideBar/SideBar';
import Main from './components/Main/Main';
import { StateProps } from './types';

export default defineComponent({
    setup() {
        const state = reactive({
            nodeList: [],
            selectedNode: null,
            nodeData: null,
        });

        const setState = <K extends keyof StateProps>(key: K, value: StateProps[K]) => {
            state[key] = value;
        };

        provide('state', state);
        provide('setState', setState);
    },
    components: {
        SideBar,
        Main,
    },
});
</script>
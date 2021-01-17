<template>
    <div class="SideBar-container" :class="{ 'SideBar-container--active': isSideBarOpen }">
        <div class="SideBar-inner">
            SideBar
            <button @click="onClick">Close sidebar</button>
            <div v-if="state.nodeData">
            <h1>{{state.nodeData.name}}</h1>
            <p>{{state.nodeData.description}}</p>
            </div>
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
import { defineComponent, reactive, watch } from 'vue';

export default defineComponent({
    inject: ['state', 'setState'],
    computed: {
        isSideBarOpen() {
            return !!this.state.selectedNode;
        },
    },
    data() {
        return { node: null, nodeData: null };
    },
    watch: {
        'state.selectedNode': function (_, newValue) {
            console.log(this);
            if (this.fetchNode) {
                this.fetchNode(newValue);
            }
        },
    },
    methods: {
        onClick() {
            this.setState('selectedNode', null);
        },
        async fetchNode() {
            const response = await fetch(`http://localhost:8888/node/${this.state.selectedNode}`);
            const result = await response.json();
            this.setState('nodeData', result);
        },
    },
});
</script>
<template>
    <div class="Main" :class="{ 'Main--pushed': isSideBarOpen }">
        <Header />
        <div v-if="state.nodeList.length">
            <TreeChart :data="parentChildData" />
        </div>
        <div v-else>Loading...</div>
    </div>
</template>

<style lang="css" scope>
.Main {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    transition: transform 0.5s;
}

.Main-title {
    margin-top: 0;
}

.Main--pushed {
    transform: translate3d(300px, 0, 0);
}
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { stratify } from 'd3-hierarchy';
import { StateProps, ApiNode } from '../../types';
import Header from '../Header/Header';
import TreeChart from '../TreeChart/TreeChart';

declare const API_URL: string;

export default defineComponent({
    inject: ['state', 'setState'],
    async mounted() {
        const response = await fetch(`${API_URL}/all`);
        const result = await response.json();
        this.setState('nodeList', result);
    },
    components: { TreeChart, Header },
    computed: {
        parentChildData() {
            if (!this.state.nodeList.length) {
                return [];
            }

            const root = stratify()
                .id((d: ApiNode) => d.name)
                .parentId((d: ApiNode) => d.parent)(this.state.nodeList);

            return root;
        },
        isSideBarOpen() {
            return !!this.state.selectedNode;
        },
    },
});
</script>
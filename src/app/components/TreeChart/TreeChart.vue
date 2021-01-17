<template>
    <div class="TreeChart-container" :style="cssVars">
        Tree
        <svg id="svg" viewBox="0 0 1200 500" />
    </div>
</template>

<style lang="css" scope>
.TreeChart-container {
    width: var(--width);
}
</style>

<script lang="ts">
import { defineComponent, inject, reactive } from 'vue';
import { tree, hierarchy, HierarchyPointNode } from 'd3-hierarchy';
import { select } from 'd3-selection';
import { linkHorizontal } from 'd3-shape';
import { StateProps, ApiNode } from '../../types';

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export default defineComponent({
    inject: ['state', 'setState'],
    props: ['data'],
    setup() {
        const localState = reactive({
            width: getWindowWidth(),
            nodeHeight: 50,
            nodeWidth: 100,
        });

        window.addEventListener('resize', function () {
            console.log(getWindowWidth());
            localState.width = getWindowWidth();
        });
        return localState;
        return {};
    },
    mounted() {
        const treeTransform = (data: any) => {
            const root: any = hierarchy(data);
            root.dx = this.nodeWidth;
            root.dy = this.width / (root.height + 1);
            return tree().nodeSize([root.dx, root.dy])(root);
        };
        console.log(this.data);
        const root = treeTransform(this.data);

        let x0 = Infinity;
        let x1 = -x0;

        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        const svg = select('svg');
        console.log(root);
        const g = svg.append('g').attr('transform', `translate(${root.dy / 4}, ${root.dx - x0})`);

        const link = g
            .append('g')
            .attr('fill', 'none')
            .attr('stroke', '#000')
            .selectAll('path')
            .data(root.links())
            .join('path')
            .attr(
                'd',
                (linkHorizontal as any)()
                    .x((d: HierarchyPointNode<{}>) => d.y)
                    .y((d: HierarchyPointNode<{}>) => d.x),
            );

        const node = g
            .append('g')
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('transform', (d) => `translate(${d.y},${d.x - this.nodeHeight / 2})`);

        node.append('rect')
            .attr('fill', (d) => '#000')
            .attr('stroke', (d) => '#fff')
            .attr('width', this.nodeWidth)
            .attr('height', this.nodeHeight);

        return svg.node();
    },
    computed: {
        cssVars() {
            return {
                '--width': `${this.width - 300}px`,
            };
        },
    },
});
</script>
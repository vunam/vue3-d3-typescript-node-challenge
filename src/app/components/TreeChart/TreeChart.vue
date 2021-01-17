<template>
    <div class="TreeChart-container" :style="cssVars">
        Tree
        <svg id="svg" viewBox="0 0 800 100" />
    </div>
</template>

<style lang="css" scope>
  .TreeChart-container {
    width: var(--width);
  }
</style>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { tree, hierarchy } from 'd3-hierarchy';
import { select } from 'd3-selection';
import { linkHorizontal } from 'd3-shape';
import { StateProps, ApiNode } from '../../types';

export default defineComponent({
    inject: ['state', 'setState'],
    props: ['data'],
    setup() {
        return {
            width: 1000,
        };
    },
    mounted() {
        const treeTransform = (data: any) => {
            const root: any = hierarchy(data);
            root.dx = 10;
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
        const g = svg
            .append('g');

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
                    .x((d) => d.y)
                    .y((d) => d.x),
            );

        const node = g
            .append('g')
            .selectAll('g')
            .data(root.descendants())
            .join('g')
            .attr('transform', (d) => `translate(${d.y},${d.x})`);

        node.append('rect')
            .attr('fill', (d) => '#000')
            .attr('stroke', (d) => '#fff')
            .attr('width', 50)
            .attr('height', 50);

        return svg.node();
    },
    computed: {
        cssVars() {
            return {
                '--width': this.width + 'px',
            };
        },
    },
});
</script>
<template>
    <div class="TreeChart-container" :style="cssVars">
        <svg id="svg" :viewBox="viewBox" />
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
    },
    mounted() {
      this.drawChart();
    },
    watch: {
        'state.selectedNode': function (_, newValue) {
            this.drawChart();
        },
    },
    computed: {
        cssVars() {
            return {
                '--width': `${this.width - 340}px`,
            };
        },
        viewBox() {
            return `0 0 ${this.width} ${this.width / 2}`;
        },
        rootVars() {
            const treeTransform = (data: any) => {
                const root: any = hierarchy(data);
                root.dx = this.nodeWidth;
                root.dy = this.width / (root.height + 1);
                return tree().nodeSize([root.dx, root.dy])(root);
            };
            const root = treeTransform(this.data);

            let x0 = Infinity;
            let x1 = -x0;

            root.each((d) => {
                if (d.x > x1) x1 = d.x;
                if (d.x < x0) x0 = d.x;
            });
            return { root, x0, x1 };
        },
    },
    methods: {
        drawChart() {
            const svg = select('#svg');
            const g = svg.append('g').attr('transform', `translate(${this.rootVars.root.dy / 4}, ${this.rootVars.root.dx - this.rootVars.x0})`);

            const link = g
                .append('g')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .selectAll('path')
                .data(this.rootVars.root.links())
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
                .data(this.rootVars.root.descendants())
                .join('g')
                .attr('transform', ({ x, y }) => `translate(${y},${x - this.nodeHeight / 2})`);

            node.append('rect')
                .attr('fill', ({ data }) => this.state.selectedNode === data.data.name ? '#00f' : '#000')
                .attr('stroke', (d) => '#fff')
                .attr('width', this.nodeWidth)
                .attr('height', this.nodeHeight);

            node.append('text')
                .attr('fill', (d) => '#fff')
                .attr('z-index', (d) => '22')
                .text(({ data }) => data.data.name)
                .attr(
                    'transform',
                    ({ data }) =>
                        `translate(${this.nodeWidth / 2 - 3 * data.data.name.length},${this.nodeHeight / 2 + 3})`,
                );

            node.on('click', (event: MouseEvent, { data }) => {
                this.setState('selectedNode', data.data.name);
            });

            node.style('cursor', 'pointer');

            return svg.node();
        },
    },
});
</script>
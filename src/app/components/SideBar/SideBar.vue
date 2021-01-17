<template>
    <div class="SideBar" :class="{ 'SideBar--active': isSideBarOpen }">
        <div class="SideBar-container">
            <button class="SideBar-button" @click="onClick">
                <img
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMSA1MTIuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAxIDUxMi4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjg0LjI4NiwyNTYuMDAyTDUwNi4xNDMsMzQuMTQ0YzcuODExLTcuODExLDcuODExLTIwLjQ3NSwwLTI4LjI4NWMtNy44MTEtNy44MS0yMC40NzUtNy44MTEtMjguMjg1LDBMMjU2LDIyNy43MTcNCgkJCUwzNC4xNDMsNS44NTljLTcuODExLTcuODExLTIwLjQ3NS03LjgxMS0yOC4yODUsMGMtNy44MSw3LjgxMS03LjgxMSwyMC40NzUsMCwyOC4yODVsMjIxLjg1NywyMjEuODU3TDUuODU4LDQ3Ny44NTkNCgkJCWMtNy44MTEsNy44MTEtNy44MTEsMjAuNDc1LDAsMjguMjg1YzMuOTA1LDMuOTA1LDkuMDI0LDUuODU3LDE0LjE0Myw1Ljg1N2M1LjExOSwwLDEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdMMjU2LDI4NC4yODcNCgkJCWwyMjEuODU3LDIyMS44NTdjMy45MDUsMy45MDUsOS4wMjQsNS44NTcsMTQuMTQzLDUuODU3czEwLjIzNy0xLjk1MiwxNC4xNDMtNS44NTdjNy44MTEtNy44MTEsNy44MTEtMjAuNDc1LDAtMjguMjg1DQoJCQlMMjg0LjI4NiwyNTYuMDAyeiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
                    width="32"
                    height="32"
                />
            </button>
            <div v-if="state.nodeData">
                <strong>Node:</strong>
                <p class="SideBar-nodeValue">{{ state.nodeData.name }}</p>
                <strong>Description:</strong>
                <p class="SideBar-nodeValue">{{ state.nodeData.description }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="css" scope>
.SideBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100%;
    background: #eee;
    transition: transform 0.5s;
    transform: translate3d(-300px, 0, 0);
}

.SideBar-container {
    padding: 50px 20px;
}

.SideBar-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
}

.SideBar-nodeValue {
    font-size: 32px;
    margin-top: 10px;
}

.SideBar--active {
    transform: translate3d(0, 0, 0);
}
</style>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

declare const API_URL: string;

export default defineComponent({
    inject: ['state', 'setState'],
    computed: {
        isSideBarOpen() {
            return !!this.state.selectedNode;
        },
    },
    watch: {
        'state.selectedNode': function (_, newValue) {
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
            const response = await fetch(`${API_URL}/node/${this.state.selectedNode}`);
            const result = await response.json();
            this.setState('nodeData', result);
        },
    },
});
</script>
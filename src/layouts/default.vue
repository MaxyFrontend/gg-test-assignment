<script setup lang="ts"></script>

<template>
    <div :class="s.layout">
        <main :class="s.main">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" module="s">
.layout {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100vh;
    overflow: hidden;
}
.main {
    position: relative;
    flex-grow: 1;
}
</style>

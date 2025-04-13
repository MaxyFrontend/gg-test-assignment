<script setup lang="ts"></script>

<template>
    <div :class="s.container">
        <slot />
    </div>
</template>

<style lang="scss" module="s">
.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}
</style>

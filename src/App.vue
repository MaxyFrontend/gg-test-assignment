<script setup lang="ts">
import { LayoutContainer } from '@/components/core/'
</script>

<template>
    <div :class="s.app">
        <LayoutContainer>
            <router-view v-slot="{ Component }">
                <Transition name="slide">
                    <component :is="Component" />
                </Transition>
            </router-view>
        </LayoutContainer>
    </div>
</template>

<style lang="scss" module="s">
.app {
}
</style>

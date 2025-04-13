<script setup lang="ts">
import { Container } from '@/components/core/'
import { AppHeaderNav } from './components/nav/'
import { ExchangeDropdown } from '@/components/common/exchange-dropdown'
import useExchange from '@/composables/useExchange'
const { setExchange } = useExchange()
</script>

<template>
    <header :class="s.header">
        <Container :class="s.container">
            <AppHeaderNav />
            <ExchangeDropdown
                :class="s.dropdown"
                @update:model-value="setExchange"
            />
        </Container>
    </header>
</template>

<style lang="scss" module="s">
.header {
    padding: 20px 0;
    background: #e0e0e0;
}
.container {
    display: flex;
    align-items: center;
}
.dropdown {
    margin-left: 45px;
}
</style>

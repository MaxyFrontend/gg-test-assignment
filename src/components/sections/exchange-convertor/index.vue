<script setup lang="ts">
import Container from '@/components/core/container.vue'
import { ExchangeConvertorForm } from './components/form/'
</script>

<template>
    <section :class="s.convertor">
        <Container>
            <ExchangeConvertorForm />
        </Container>
    </section>
</template>

<style lang="scss" module="s">
.convertor {
}
</style>

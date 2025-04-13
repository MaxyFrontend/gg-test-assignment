<script setup lang="ts">
import { ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

type NavList = {
    name: string
    route: RouteLocationRaw
}[]

const navList = ref<NavList>([
    {
        name: 'Главная',
        route: { name: 'home' }
    },
    {
        name: 'Конвертация',
        route: { name: 'convert' }
    }
])
</script>

<template>
    <nav :class="s.nav">
        <ul :class="s.navList">
            <li v-for="item in navList" :key="item.name" :class="s.navListItem">
                <RouterLink :to="item.route">
                    {{ item.name }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module="s">
.nav {
    margin-left: auto;
}
.navList {
    display: flex;
    align-items: center;
}
.navListItem {
    color: #242424;
    & a {
        &:hover {
            text-decoration: underline;
        }
    }
    &:nth-child(n + 2) {
        margin-left: 45px;
    }
}
</style>

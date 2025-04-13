import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home.vue'
import ConvertPage from '../pages/convert.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: {
                layout: 'default'
            }
        },
        {
            path: '/convert',
            name: 'convert',
            component: ConvertPage,
            meta: {
                layout: 'default'
            }
        }
    ]
})

export default router

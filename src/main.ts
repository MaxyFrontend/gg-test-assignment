import './assets/scss/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import clickOutside from '@/directive/clickOutside'

const app = createApp(App)

app.use(router)
app.directive('click-outside', clickOutside)

app.mount('#app')

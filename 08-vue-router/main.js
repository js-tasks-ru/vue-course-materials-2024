import '@shgk/vue-course-ui/style.css'

import '@shgk/vue-course-ui/meetups/assets/styles/_form-group.css'
import '@shgk/vue-course-ui/meetups/assets/styles/_input-group.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.js'

createApp(App).use(router).mount('#app')

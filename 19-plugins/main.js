import '@shgk/vue-course-ui/style.css'

import '@shgk/vue-course-ui/meetups/assets/styles/_form-group.css'
import '@shgk/vue-course-ui/meetups/assets/styles/_input-group.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createToaster } from './plugins/toaster.ts'

const toaster = createToaster()

createApp(App).use(toaster).mount('#app')

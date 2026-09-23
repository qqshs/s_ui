import { createApp } from 'vue'
import App from './App.vue'
import ShsUI from '@shs-ui/components'
import '@shs-ui/theme'
import '@shs-ui/components/style'

createApp(App).use(ShsUI).mount('#app')

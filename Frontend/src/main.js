import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true

const app = createApp(App)

import AlertPopup from './components/AlertPopup'
import Avatar from './components/Avatar'
import ButtonSubmit from './components/ButtonSubmit'
import FormGroup from './components/FormGroup'
import NavLeft from './components/NavLeft'
import NavTop from './components/NavTop'
app.component('AlertPopup', AlertPopup)
app.component('Avatar', Avatar)
app.component('ButtonSubmit', ButtonSubmit)
app.component('FormGroup', FormGroup)
app.component('NavLeft', NavLeft)
app.component('NavTop', NavTop)

store.dispatch('auth/checkSignin')
store.dispatch('mqttConn/init')
app.use(store)
app.use(store).use(router).mount('#app')
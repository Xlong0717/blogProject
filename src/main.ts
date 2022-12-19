import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/style/asets.scss'


import routes from '@/route/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入阿里图标

import '@/assets/fonts/iconfont.css' ;
import '@/assets/fonts/iconfont.js'

// 粒子背景
import Particles from 'particles.vue3'









const app = createApp(App)

app.use(Particles);



// app.use(Particles)
app.use(ElementPlus);
app.use(routes) ;
app.mount('#app') ;



// createApp(App).use(routes).mount('#app')

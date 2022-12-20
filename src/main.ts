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

// 引入编辑文档md
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
  Prism,
});










const app = createApp(App)

app.use(Particles);

// app.use(VMdPreview)

app.use(VMdPreview);
app.use(ElementPlus);
app.use(routes) ;
app.mount('#app') ;
// createApp(App).use(routes).mount('#app')

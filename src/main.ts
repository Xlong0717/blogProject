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
// import VMdPreview from '@kangc/v-md-editor/lib/preview';
// import '@kangc/v-md-editor/lib/style/preview.css';
// // VuePress主题以及样式（这里也可以选择github主题）
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 音乐播放器 

// Prism
// import Prism from 'prismjs';
// // 代码高亮
// import 'prismjs/components/prism-json';
// // 选择使用主题
// VMdPreview.use(vuepressTheme, {
//   Prism,
// });


import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

// 代码高亮
import VueMarkdownEditor from '@kangc/v-md-editor';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';


// 代码高亮主题 

// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
// import '@kangc/v-md-editor/lib/theme/style/github.css';


// import hljs from 'highlight.js/lib/core';
// // 按需引入语言包
// import json from 'highlight.js/lib/languages/json';

// hljs.registerLanguage('json', json);

// VueMarkdownEditor.use(githubTheme, {
//   Hljs: hljs,
// });
// import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 引入所有语言包
// import hljs from 'highlight.js';

// VueMarkdownEditor.use(githubTheme, {
//   Hljs: hljs,
// });


import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式


// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';

VMdPreview.use(vuepressTheme, {
  Prism,
});
// markdown支持流程图
// VMdPreview.use(createMermaidPlugin())
// markdown支持显示代码行数
VMdPreview.use(createLineNumbertPlugin())
// markdown支持代码快速复制
VMdPreview.use(createCopyCodePlugin());

// markdown支持emoji
// VMdPreview.use(createEmojiPlugin());











const app = createApp(App)

app.use(Particles);
// app.use(VMdPreview)

app.use(VMdPreview);
app.use(ElementPlus);
app.use(routes) ;
app.mount('#app') ;
// createApp(App).use(routes).mount('#app')

app.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block:any)=>{
    hljs.highlightBlock(block)
  })
})

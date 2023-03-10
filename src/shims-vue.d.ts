/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace Service {
  interface PostsList {
    data: postItem[] | string;
    code: number;
  }

  type postItem = {
    _id: string;
    title: string;
    content: string;
    categories: string[];
    tags: string[];
    createDate: string;
    updateDate: string;
  }
}

declare module '@kangc/v-md-editor'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@prismjs/prism.js'
declare module 'prismjs'
// declare module 'vue-aplayer'
declare module 'vue-live2d'
declare module '@kangc/v-md-editor/lib/plugins/line-number/index'
declare module  '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
declare interface Window {
  L2Dwidget:any
}
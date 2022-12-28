import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import layout from '@/layout/components/bolgView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/Home',
    component: layout,
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('@/views/Home/index.vue'),
      },
      {
        path: 'About',
        name: 'About',
        component: () => import('@/views/About/index.vue'),
      },
      {
        path: 'Detail',
        name: 'Detail',
        component: () => import('@/views/Detail/index.vue'),
      },
      {
        path:'Tags',
        name:'Tags',
        component: () => import('@/views/Tags/index.vue'),
      },
      {
        path:'TagsDetail',
        name:'TagsDetail',
        component: () => import('@/views/Tags/tagsDetail.vue'),
      },
      {
        path:'PhoneImg',
        name:'PhoneImg',
        component: () => import('@/views/photoImg/index.vue'),
      },
      {
        path:'Archive',
        name:'Archive',
        component: () => import('@/views/Archive/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => {
      /*wwbpackChunkName:"notFound"*/ '@/views/notFound.vue';
    },
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});

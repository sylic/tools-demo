import { createRouter,type RouteRecordRaw,createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/compressPhoto',
    component: () => import("./views/compressImg/index.vue"),
    props: true,
    // beforeEnter: (to, from) => {
    //   return true;
    // },
  },
    {
    path: '/extractText',
    component: () => import("./views/ExtractText/index.vue"),
    props: true,
    meta: {
      title:'图片文字识别'
    }
  }
]
const ErrorRoutes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    component:()=>import("./views/404.vue")
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes:[...routes,...ErrorRoutes]
})

router.beforeEach((to):boolean => {
  setPageTitle(to);
  return true;
})

const setPageTitle = (to:any) => {
  let title = to.meta.title || "";
  document.title = title;
}

export default router;
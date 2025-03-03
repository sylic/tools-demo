import { createRouter,type RouteRecordRaw,createWebHistory } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/compressPhoto',
    component: () => import("./views/compressImg/index.vue"),
    props: true,
    beforeEnter: (to, from) => {
      // console.log("⭐ ~ 当前打印的内容 ~ :",to,from );  
      return true;
    },
  },
    {
    // path: '/extractText',
    path: '/',
    component: () => import("./views/ExtractText/index.vue"),
    props: true,
    beforeEnter: (to, from) => {
      // console.log("⭐ ~ 当前打印的内容 ~ :",to,from );  
      return true;
    },
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

router.beforeEach((to, from) => {
  // console.log("⭐ ~ 当前打印的内容 ~ :",to,from );  
  return true;
})

export default router;
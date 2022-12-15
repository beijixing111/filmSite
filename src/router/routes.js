import Film from "../views/film/index";
import NotFound from "../views/notfound";

// {
//   path: '/film',
//   name: 'film',
//   component: Film,
//   meta: {
//     title: '电影',
//     keepAlive: true,
//   }
// },

export default [
  {
    path: "/",
    name: "film",
    // redirect: '/film',
    component: Film,
    meta: {
      title: "电影",
      keepAlive: true,
    },
  },
  {
    path: "/landing/:id",
    name: "landing",
    // redirect: '/film',
    component: () => import("../views/landing/index"),
    meta: {
      title: "banner详情", 
    },
  },
  {
    path: "/filmdetail/:id",
    name: "film-detail",
    component: () => import("../views/film/detail"),
    meta: {
      title: "",
    },
  },
  {
    path: "/mine",
    name: "mine",
    component: () => import("../views/mine/index.vue"),
    meta: {
      title: "我的中心",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register/index.vue"),
    meta: {
      title: "注册",
    },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("../views/favorite/index.vue"),
    meta: {
      title: "我的收藏",
      isAuth: true,
    },
  },
  // {
  //   path: '/pdfView',
  //   name: 'pdfView',
  //   component: () => import('../views/pdf/index.vue'),
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

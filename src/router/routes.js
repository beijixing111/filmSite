import Film from '../views/film/index';
import NotFound from '../views/notfound';

export default [
    {
      path: '/',
      redirect: '/film', 
    },
    {
      path: '/film',
      name: 'film',  
      component: Film,
      meta: {
        title: '电影',
        keepAlive: true,
      }
    },
    {
      path: '/filmdetail/:id',
      name: 'film-detail',  
      component: () => import('../views/film/detail'),
      meta: {
        title: '电影-详情页'
      }
    },  
    {
      path: '/mine',
      name: 'mine',  
      component: () => import('../views/mine/index.vue'),
      meta: {
        title: '我的中心'
      }
    }, 
    {
      path: '/login',
      name: 'login',  
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/favorite/index.vue'),
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound
    }, 
]
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'; 
import store from '../store';

const router = createRouter({ 
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '影视欣赏';
  if(to.meta.isAuth && !store.getters.getUserIsLogin){
    return next({name: 'login'});
  }
  next();
})

export default router

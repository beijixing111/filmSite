import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vantComponents from '@/components/vant';

import './assets/css/base.css';
// import 'fontisto/css/fontisto/fontisto.css';


const app = createApp(App); 
vantComponents.forEach(item => app.use(item));

app.use(store).use(router).mount('#app')

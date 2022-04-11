import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { component } from './packages';
import axios from '@/plugins/axios';

// // windicss layers
// import 'virtual:windi-base.css';
// import 'virtual:windi-components.css';
// // custom styles
// import './assets/styles/main.less';
// // windicss utilities should be the last style import
// import 'virtual:windi-utilities.css';
// // windicss devtools support (dev only)
// import 'virtual:windi-devtools';

import 'normalize.css';
// 'uno:[layer-name].css'
import 'uno:components.css';
// layers that are not 'components' and 'utilities' will fallback to here
import 'uno.css';
// your own CSS
import './assets/styles/main.less';
// "utilities" layer will have the highest priority
import 'uno:utilities.css';

const pinia = createPinia();

const app = createApp(App);

// 注册组件列表
Object.entries(component).forEach(entry => {
    app.component(entry[0], entry[1]);
});

app.use(router)
    .use(pinia)
    .use(axios)
    .mount('#app');
